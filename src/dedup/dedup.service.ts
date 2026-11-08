import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { EventFingerprintRepository } from './infrastructure/event-fingerprint.repository.js';
import { DuplicateEventException } from '../shared/exceptions/notification.exceptions.js';

@Injectable()
export class DedupService {
  constructor(private readonly fingerprintRepository: EventFingerprintRepository) {}

  private buildHash(eventId: string, type: string): string {
    return createHash('sha256').update(`${eventId}:${type}`).digest('hex');
  }

  async assertNotDuplicate(eventId: string, type: string): Promise<void> {
    const hash = this.buildHash(eventId, type);
    const exists = await this.fingerprintRepository.exists(hash);
    if (exists) throw new DuplicateEventException();
    await this.fingerprintRepository.register(eventId, hash);
  }

  buildBookingHash(bookingId: string, status: string): string {
    return createHash('sha256').update(`booking:${bookingId}:${status}`).digest('hex');
  }

  async isMailAlreadySent(bookingId: string, status: string): Promise<boolean> {
    const hash = this.buildBookingHash(bookingId, status);
    return this.fingerprintRepository.exists(hash);
  }

  async markMailSent(bookingId: string, status: string): Promise<void> {
    const hash = this.buildBookingHash(bookingId, status);
    await this.fingerprintRepository.register(`mail:${bookingId}:${status}`, hash);
  }
}
