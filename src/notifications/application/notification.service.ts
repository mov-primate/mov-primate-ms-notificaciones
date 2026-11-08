import { Injectable, Logger } from '@nestjs/common';
import { Types } from 'mongoose';
import { NotificationRepository } from '../infrastructure/notification.repository.js';
import { DedupService } from '../../dedup/dedup.service.js';
import { EmailTemplateService } from '../../templates/email-template.service.js';
import { RecipientResolverService } from '../../recipients/recipient-resolver.service.js';
import { RetryService } from '../../retry/retry.service.js';
import { NotificationTypeEnum, NotificationStatusEnum, AttendanceStatusEnum, RoleEnum } from '../../shared/enums/index.js';
import { DuplicateEventException } from '../../shared/exceptions/notification.exceptions.js';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly dedupService: DedupService,
    private readonly templateService: EmailTemplateService,
    private readonly recipientResolver: RecipientResolverService,
    private readonly retryService: RetryService,
  ) {}

  async processBookingEvent(eventId: string, type: NotificationTypeEnum, event: Record<string, any>): Promise<void> {
    try {
      await this.dedupService.assertNotDuplicate(eventId, type);
    } catch (err) {
      if (err instanceof DuplicateEventException) {
        this.logger.warn(`[Dedup] Skipping duplicate event: ${eventId}:${type}`);
        return;
      }
      throw err;
    }

    const recipients = this.recipientResolver.resolve(type, event);

    for (const recipient of recipients) {
      const template = this.templateService.getBookingTemplate(type, event);

      const notification = await this.notificationRepository.create({
        type,
        recipientId: new Types.ObjectId(recipient.recipientId),
        recipientRole: recipient.recipientRole,
        payload: { ...event, subject: template.subject, body: template.body },
        status: NotificationStatusEnum.PENDING,
        eventId,
      });

      await this.deliver((notification._id as Types.ObjectId).toString(), template);
    }
  }

  async processAttendanceEvent(eventId: string, event: { studentId: string; bookingId: string; attendanceStatus: AttendanceStatusEnum; slotStart?: string }): Promise<void> {
    try {
      await this.dedupService.assertNotDuplicate(eventId, NotificationTypeEnum.ATTENDANCE_UPDATED);
    } catch (err) {
      if (err instanceof DuplicateEventException) {
        this.logger.warn(`[Dedup] Skipping duplicate attendance event: ${eventId}`);
        return;
      }
      throw err;
    }

    const template = this.templateService.getAttendanceTemplate(event.attendanceStatus, event);

    const notification = await this.notificationRepository.create({
      type: NotificationTypeEnum.ATTENDANCE_UPDATED,
      recipientId: new Types.ObjectId(event.studentId),
      recipientRole: RoleEnum.ALUMNO,
      payload: { ...event, subject: template.subject, body: template.body },
      status: NotificationStatusEnum.PENDING,
      eventId,
    });

    await this.deliver((notification._id as Types.ObjectId).toString(), template);
  }

  async resendConfirmationMail(bookingId: string, status: string, event: Record<string, any>): Promise<{ skipped: boolean }> {
    const alreadySent = await this.dedupService.isMailAlreadySent(bookingId, status);
    if (alreadySent) {
      this.logger.log(`[Resend] Mail already sent for booking ${bookingId} status ${status} — skipping`);
      return { skipped: true };
    }

    const type = this.statusToType(status);
    const template = this.templateService.getBookingTemplate(type, event);

    const notification = await this.notificationRepository.create({
      type,
      recipientId: new Types.ObjectId(event.studentId),
      recipientRole: RoleEnum.ALUMNO,
      payload: { ...event, subject: template.subject, body: template.body, resend: true },
      status: NotificationStatusEnum.PENDING,
    });

    await this.deliver((notification._id as Types.ObjectId).toString(), template);
    await this.dedupService.markMailSent(bookingId, status);

    return { skipped: false };
  }

  private statusToType(status: string): NotificationTypeEnum {
    const map: Record<string, NotificationTypeEnum> = {
      pendiente: NotificationTypeEnum.BOOKING_CREATED,
      confirmado: NotificationTypeEnum.BOOKING_CONFIRMED,
      rechazado: NotificationTypeEnum.BOOKING_REJECTED,
      cancelado: NotificationTypeEnum.BOOKING_CANCELLED,
    };
    return map[status] ?? NotificationTypeEnum.BOOKING_CREATED;
  }

  private async deliver(notificationId: string, template: { subject: string; body: string }): Promise<void> {
    try {
      this.logger.log(`[Delivery] subject="${template.subject}" notificationId=${notificationId}`);
      await this.retryService.handleSuccess(notificationId);
    } catch (err) {
      await this.retryService.handleFailure(notificationId, (err as Error).message);
    }
  }

  async getNotificationsForRecipient(recipientId: string): Promise<any[]> {
    return this.notificationRepository.findByRecipient(new Types.ObjectId(recipientId));
  }

  async getAllNotifications(): Promise<any[]> {
    return this.notificationRepository.findAll();
  }
}
