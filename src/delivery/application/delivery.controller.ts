import { Controller, Get, Param } from '@nestjs/common';
import { DeliveryService } from './delivery.service.js';

@Controller('notifications/delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get(':notificationId/attempts')
  async getAttempts(@Param('notificationId') notificationId: string) {
    return this.deliveryService.getDeliveryLog(notificationId);
  }

  @Get(':notificationId/count')
  async getAttemptCount(@Param('notificationId') notificationId: string) {
    return { count: await this.deliveryService.getAttemptCount(notificationId) };
  }
}
