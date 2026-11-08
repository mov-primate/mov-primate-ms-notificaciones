import { Injectable } from '@nestjs/common';
import { NotificationService } from '../notifications/application/notification.service.js';
import { AttendanceStatusEnum } from '../shared/enums/index.js';

@Injectable()
export class AttendanceEventHandler {
  constructor(private readonly notificationService: NotificationService) {}

  async handle(eventId: string, event: { studentId: string; bookingId: string; attendanceStatus: AttendanceStatusEnum; slotStart?: string }): Promise<void> {
    await this.notificationService.processAttendanceEvent(eventId, event);
  }
}
