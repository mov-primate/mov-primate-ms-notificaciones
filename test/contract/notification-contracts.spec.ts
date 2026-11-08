import { NotificationTypeEnum, NotificationStatusEnum, RoleEnum, AttendanceStatusEnum } from '../../src/shared/enums';
import { DuplicateEventException, DeliveryFailedException, MaxRetriesExceededException } from '../../src/shared/exceptions/notification.exceptions';

describe('Notification Service Contracts (T021)', () => {
  it('should expose 8 notification types as contract', () => {
    expect(Object.values(NotificationTypeEnum)).toHaveLength(8);
  });

  it('should expose 4 notification statuses', () => {
    expect(Object.values(NotificationStatusEnum)).toHaveLength(4);
  });

  it('should expose 4 roles', () => {
    expect(Object.values(RoleEnum)).toHaveLength(4);
  });

  it('should expose 3 attendance statuses (T024)', () => {
    expect(Object.values(AttendanceStatusEnum)).toHaveLength(3);
  });

  it('should have DuplicateEventException with correct code', () => {
    const err = new DuplicateEventException();
    expect(err.code).toBe('ERR_DUPLICATE_EVENT');
    expect(err.statusCode).toBe(409);
  });

  it('should have MaxRetriesExceededException with correct code', () => {
    const err = new MaxRetriesExceededException();
    expect(err.code).toBe('ERR_MAX_RETRIES_EXCEEDED');
    expect(err.statusCode).toBe(500);
  });

  it('should have DeliveryFailedException with correct code', () => {
    const err = new DeliveryFailedException();
    expect(err.code).toBe('ERR_DELIVERY_FAILED');
    expect(err.statusCode).toBe(502);
  });
});
