import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class DeliveryAttempt extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Notification', required: true })
  notificationId: Types.ObjectId;

  @Prop({ type: Number, required: true, default: 1 })
  attempt: number;

  @Prop({ type: String, required: true, enum: ['success', 'failure'] })
  result: string;

  @Prop({ type: String })
  error?: string;

  @Prop({ type: Date, default: Date.now })
  timestamp: Date;
}

export const DeliveryAttemptSchema = SchemaFactory.createForClass(DeliveryAttempt);
