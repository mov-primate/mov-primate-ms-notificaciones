import { Injectable } from '@nestjs/common';
import { RoleEnum, NotificationTypeEnum } from '../shared/enums/index.js';

export interface NotificationRecipient {
  recipientId: string;
  recipientRole: RoleEnum;
}

@Injectable()
export class RecipientResolverService {
  resolve(type: NotificationTypeEnum, event: Record<string, any>): NotificationRecipient[] {
    const recipients: NotificationRecipient[] = [];

    switch (type) {
      case NotificationTypeEnum.BOOKING_CREATED:
      case NotificationTypeEnum.BOOKING_CONFIRMED:
      case NotificationTypeEnum.BOOKING_REJECTED:
      case NotificationTypeEnum.BOOKING_CANCELLED:
      case NotificationTypeEnum.REMINDER:
      case NotificationTypeEnum.ATTENDANCE_UPDATED:
        if (event.studentId) {
          recipients.push({ recipientId: event.studentId, recipientRole: RoleEnum.ALUMNO });
        }
        break;

      case NotificationTypeEnum.ADMIN_PENDING_ALERT:
        if (event.professorId) {
          recipients.push({ recipientId: event.professorId, recipientRole: RoleEnum.ADMIN });
        }
        break;

      case NotificationTypeEnum.SUPERADMIN_EXCEPTION_ALERT:
        if (event.superadminId) {
          recipients.push({ recipientId: event.superadminId, recipientRole: RoleEnum.SUPERADMIN });
        }
        break;
    }

    return recipients;
  }
}
