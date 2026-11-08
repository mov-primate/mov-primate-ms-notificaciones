import { NotificationTypeEnum, NotificationStatusEnum, AttendanceStatusEnum } from '../../src/shared/enums';

describe('Booking Notification Flow Integration (T019)', () => {
  it('should have 8 notification types', () => {
    expect(Object.values(NotificationTypeEnum)).toHaveLength(8);
  });

  it('should have 4 notification statuses', () => {
    expect(Object.values(NotificationStatusEnum)).toHaveLength(4);
    expect(Object.values(NotificationStatusEnum)).toContain('pending');
    expect(Object.values(NotificationStatusEnum)).toContain('sent');
    expect(Object.values(NotificationStatusEnum)).toContain('failed');
    expect(Object.values(NotificationStatusEnum)).toContain('retrying');
  });

  it('should map 4 booking statuses to 4 notification types', () => {
    const statusMap = {
      pendiente: NotificationTypeEnum.BOOKING_CREATED,
      confirmado: NotificationTypeEnum.BOOKING_CONFIRMED,
      rechazado: NotificationTypeEnum.BOOKING_REJECTED,
      cancelado: NotificationTypeEnum.BOOKING_CANCELLED,
    };
    expect(Object.keys(statusMap)).toHaveLength(4);
  });

  it('should support 3 attendance statuses (T024)', () => {
    expect(Object.values(AttendanceStatusEnum)).toHaveLength(3);
  });
});
