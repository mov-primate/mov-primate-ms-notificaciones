import { Injectable } from '@nestjs/common';
import { DeliveryAttemptRepository } from '../infrastructure/delivery-attempt.repository.js';
import { Types } from 'mongoose';

@Injectable()
export class DeliveryService {
  constructor(private readonly deliveryAttemptRepository: DeliveryAttemptRepository) {}

  async getDeliveryLog(notificationId: string) {
    return this.deliveryAttemptRepository.findByNotification(new Types.ObjectId(notificationId));
  }

  async getAttemptCount(notificationId: string): Promise<number> {
    return this.deliveryAttemptRepository.countAttempts(new Types.ObjectId(notificationId));
  }
}
