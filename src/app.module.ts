import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Notification, NotificationSchema } from './notifications/domain/notification.schema';
import { DeliveryAttempt, DeliveryAttemptSchema } from './delivery/domain/delivery-attempt.schema';
import { EventFingerprint, EventFingerprintSchema } from './dedup/domain/event-fingerprint.schema';

import { NotificationRepository } from './notifications/infrastructure/notification.repository';
import { DeliveryAttemptRepository } from './delivery/infrastructure/delivery-attempt.repository';
import { EventFingerprintRepository } from './dedup/infrastructure/event-fingerprint.repository';

import { NotificationService } from './notifications/application/notification.service';
import { NotificationController } from './notifications/application/notification.controller';
import { DeliveryService } from './delivery/application/delivery.service';
import { DeliveryController } from './delivery/application/delivery.controller';
import { DedupService } from './dedup/dedup.service';
import { EmailTemplateService } from './templates/email-template.service';
import { RecipientResolverService } from './recipients/recipient-resolver.service';
import { RetryService } from './retry/retry.service';
import { BookingEventHandler } from './events/booking-event.handler';
import { AttendanceEventHandler } from './events/attendance-event.handler';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ObserveModule.forRoot({
      appKey: process.env.OBSERVE_APP_KEY ?? 'YOUR_APP_KEY',
      appSecret: process.env.OBSERVE_APP_SECRET ?? 'YOUR_APP_SECRET',
      serviceId: 'mov-primate-ms-notificaciones',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI ?? 'mongodb://localhost:27017/mov-primate-notificaciones'),
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
      { name: DeliveryAttempt.name, schema: DeliveryAttemptSchema },
      { name: EventFingerprint.name, schema: EventFingerprintSchema },
    ]),
  ],
  controllers: [AppController, NotificationController, DeliveryController],
  providers: [
    AppService,
    NotificationRepository,
    DeliveryAttemptRepository,
    EventFingerprintRepository,
    DedupService,
    EmailTemplateService,
    RecipientResolverService,
    RetryService,
    NotificationService,
    DeliveryService,
    BookingEventHandler,
    AttendanceEventHandler,
  ],
})
export class AppModule {}
