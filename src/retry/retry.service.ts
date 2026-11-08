import { Injectable, Logger } from '@nestjs/common';
import { NotificationRepository } from '../notifications/infrastructure/notification.repository.js';
import { DeliveryAttemptRepository } from '../delivery/infrastructure/delivery-attempt.repository.js';
import { NotificationStatusEnum } from '../shared/enums/index.js';
import { MaxRetriesExceededException } from '../shared/exceptions/notification.exceptions.js';
import { Types } from 'mongoose';

const MAX_RETRIES = 3;

@Injectable()
export class RetryService {
  private readonly logger = new Logger(RetryService.name);

  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly deliveryAttemptRepository: DeliveryAttemptRepository,
  ) {}

  async handleFailure(notificationId: string, error: string): Promise<void> {
    const nId = new Types.ObjectId(notificationId);
    const attempts = await this.deliveryAttemptRepository.countAttempts(nId);

    await this.deliveryAttemptRepository.create(nId, attempts + 1, 'failure', error);

    if (attempts + 1 >= MAX_RETRIES) {
      await this.notificationRepository.updateStatus(notificationId, NotificationStatusEnum.FAILED);
      this.logger.error(`[Retry] Max retries (${MAX_RETRIES}) exceeded for notification ${notificationId}`);
      throw new MaxRetriesExceededException();
    }

    await this.notificationRepository.updateStatus(notificationId, NotificationStatusEnum.RETRYING);
    const backoffMs = Math.pow(2, attempts) * 1000;
    this.logger.warn(`[Retry] Attempt ${attempts + 1}/${MAX_RETRIES} for ${notificationId}. Backoff: ${backoffMs}ms`);
  }

  async handleSuccess(notificationId: string): Promise<void> {
    const nId = new Types.ObjectId(notificationId);
    const attempts = await this.deliveryAttemptRepository.countAttempts(nId);
    await this.deliveryAttemptRepository.create(nId, attempts + 1, 'success');
    await this.notificationRepository.updateStatus(notificationId, NotificationStatusEnum.SENT);
  }
}
