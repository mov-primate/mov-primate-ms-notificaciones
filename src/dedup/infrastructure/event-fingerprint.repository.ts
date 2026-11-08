import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventFingerprint } from '../domain/event-fingerprint.schema.js';

@Injectable()
export class EventFingerprintRepository {
  constructor(@InjectModel(EventFingerprint.name) private readonly model: Model<EventFingerprint>) {}

  async exists(hash: string): Promise<boolean> {
    const count = await this.model.countDocuments({ hash }).exec();
    return count > 0;
  }

  async register(eventId: string, hash: string): Promise<void> {
    await this.model.create({ eventId, hash });
  }
}
