import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { NotificationService } from './notification.service.js';
import { NotificationTypeEnum, AttendanceStatusEnum } from '../../shared/enums/index.js';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('events/booking')
  async handleBookingEvent(@Body() body: {
    eventId: string;
    type: NotificationTypeEnum;
    event: Record<string, any>;
  }) {
    await this.notificationService.processBookingEvent(body.eventId, body.type, body.event);
    return { accepted: true };
  }

  @Post('events/attendance')
  async handleAttendanceEvent(@Body() body: {
    eventId: string;
    studentId: string;
    bookingId: string;
    attendanceStatus: AttendanceStatusEnum;
    slotStart?: string;
  }) {
    await this.notificationService.processAttendanceEvent(body.eventId, {
      studentId: body.studentId,
      bookingId: body.bookingId,
      attendanceStatus: body.attendanceStatus,
      slotStart: body.slotStart,
    });
    return { accepted: true };
  }

  @Post('resend')
  async resendMail(@Body() body: { bookingId: string; status: string; event: Record<string, any> }) {
    return this.notificationService.resendConfirmationMail(body.bookingId, body.status, body.event);
  }

  @Get('recipient/:id')
  async getForRecipient(@Param('id') id: string) {
    return this.notificationService.getNotificationsForRecipient(id);
  }

  @Get()
  async getAll() {
    return this.notificationService.getAllNotifications();
  }
}
