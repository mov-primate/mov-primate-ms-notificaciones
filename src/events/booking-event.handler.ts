import { Injectable, Logger } from '@nestjs/common';
import { NotificationService } from '../notifications/application/notification.service.js';
import { NotificationTypeEnum } from '../shared/enums/index.js';

@Injectable()
export class BookingEventHandler {
  private readonly logger = new Logger(BookingEventHandler.name);

  constructor(private readonly notificationService: NotificationService) {}

  async handle(eventId: string, bookingStatus: string, event: Record<string, any>): Promise<void> {
    const statusToType: Record<string, NotificationTypeEnum> = {
      pendiente: NotificationTypeEnum.BOOKING_CREATED,
      confirmado: NotificationTypeEnum.BOOKING_CONFIRMED,
      rechazado: NotificationTypeEnum.BOOKING_REJECTED,
      cancelado: NotificationTypeEnum.BOOKING_CANCELLED,
    };

    const type = statusToType[bookingStatus];
    if (!type) {
      this.logger.warn(`Unknown booking status for notification: ${bookingStatus}`);
      return;
    }

    await this.notificationService.processBookingEvent(eventId, type, event);

    if (bookingStatus === 'pendiente' && event.professorId) {
      await this.notificationService.processBookingEvent(
        `${eventId}:admin`,
        NotificationTypeEnum.ADMIN_PENDING_ALERT,
        event,
      );
    }
  }
}
