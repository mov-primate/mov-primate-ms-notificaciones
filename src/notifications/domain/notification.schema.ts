import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { NotificationTypeEnum, NotificationStatusEnum, RoleEnum } from '../../shared/enums/index.js';

@Schema({ timestamps: true })
export class Notification extends Document {
  @Prop({ type: String, required: true, enum: NotificationTypeEnum })
  type: NotificationTypeEnum;

  @Prop({ type: Types.ObjectId, required: true })
  recipientId: Types.ObjectId;

  @Prop({ type: String, required: true, enum: RoleEnum })
  recipientRole: RoleEnum;

  @Prop({ type: Object, required: true })
  payload: Record<string, any>;

  @Prop({ type: String, required: true, enum: NotificationStatusEnum, default: NotificationStatusEnum.PENDING })
  status: NotificationStatusEnum;

  @Prop({ type: String, default: 'email' })
  channel: string;

  @Prop({ type: String })
  eventId?: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
