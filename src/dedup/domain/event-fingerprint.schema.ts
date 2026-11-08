import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class EventFingerprint extends Document {
  @Prop({ required: true, unique: true })
  hash: string;

  @Prop({ required: true })
  eventId: string;

  @Prop({ type: Date, default: Date.now })
  processedAt: Date;
}

export const EventFingerprintSchema = SchemaFactory.createForClass(EventFingerprint);
