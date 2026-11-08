import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { DeliveryAttempt } from '../domain/delivery-attempt.schema.js';

@Injectable()
export class DeliveryAttemptRepository {
  constructor(@InjectModel(DeliveryAttempt.name) private readonly model: Model<DeliveryAttempt>) {}

  async create(notificationId: Types.ObjectId, attempt: number, result: string, error?: string): Promise<DeliveryAttempt> {
    return this.model.create({ notificationId, attempt, result, error, timestamp: new Date() });
  }

  async findByNotification(notificationId: Types.ObjectId): Promise<DeliveryAttempt[]> {
    return this.model.find({ notificationId }).sort({ timestamp: 1 }).exec();
  }

  async countAttempts(notificationId: Types.ObjectId): Promise<number> {
    return this.model.countDocuments({ notificationId }).exec();
  }
}
