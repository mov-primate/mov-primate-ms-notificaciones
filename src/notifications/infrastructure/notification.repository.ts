import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Notification } from '../domain/notification.schema.js';
import { NotificationStatusEnum } from '../../shared/enums/index.js';

@Injectable()
export class NotificationRepository {
  constructor(@InjectModel(Notification.name) private readonly model: Model<Notification>) {}

  async create(data: Partial<Notification>): Promise<Notification> {
    return this.model.create(data);
  }

  async findById(id: string): Promise<Notification | null> {
    return this.model.findById(id).exec();
  }

  async updateStatus(id: string, status: NotificationStatusEnum): Promise<Notification | null> {
    return this.model.findByIdAndUpdate(id, { status }, { new: true }).exec();
  }

  async findByRecipient(recipientId: Types.ObjectId): Promise<Notification[]> {
    return this.model.find({ recipientId }).sort({ createdAt: -1 }).exec();
  }

  async findAll(): Promise<Notification[]> {
    return this.model.find().sort({ createdAt: -1 }).exec();
  }

  async findPending(): Promise<Notification[]> {
    return this.model.find({ status: { $in: [NotificationStatusEnum.PENDING, NotificationStatusEnum.RETRYING] } }).exec();
  }
}
