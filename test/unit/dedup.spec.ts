import { DedupService } from '../../src/dedup/dedup.service';
import { DuplicateEventException } from '../../src/shared/exceptions/notification.exceptions';
import { NotificationTypeEnum } from '../../src/shared/enums';

describe('DedupService (T008, T023)', () => {
  it('should throw DuplicateEventException when event already exists', async () => {
    const mockRepo = {
      exists: jest.fn().mockResolvedValue(true),
      register: jest.fn(),
    };
    const service = new DedupService(mockRepo as any);
    await expect(service.assertNotDuplicate('evt1', NotificationTypeEnum.BOOKING_CREATED)).rejects.toThrow(DuplicateEventException);
  });

  it('should register event hash when not duplicate', async () => {
    const mockRepo = {
      exists: jest.fn().mockResolvedValue(false),
      register: jest.fn().mockResolvedValue(undefined),
    };
    const service = new DedupService(mockRepo as any);
    await expect(service.assertNotDuplicate('evt1', NotificationTypeEnum.BOOKING_CREATED)).resolves.not.toThrow();
    expect(mockRepo.register).toHaveBeenCalledTimes(1);
  });

  it('should detect already-sent mail (T023)', async () => {
    const mockRepo = {
      exists: jest.fn().mockResolvedValue(true),
      register: jest.fn(),
    };
    const service = new DedupService(mockRepo as any);
    const result = await service.isMailAlreadySent('booking123', 'confirmado');
    expect(result).toBe(true);
  });

  it('should mark mail as sent idempotently', async () => {
    const mockRepo = {
      exists: jest.fn().mockResolvedValue(false),
      register: jest.fn().mockResolvedValue(undefined),
    };
    const service = new DedupService(mockRepo as any);
    await service.markMailSent('booking123', 'confirmado');
    expect(mockRepo.register).toHaveBeenCalledTimes(1);
  });
});
