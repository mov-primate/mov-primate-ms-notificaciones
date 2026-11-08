import { RecipientResolverService } from '../../src/recipients/recipient-resolver.service';
import { NotificationTypeEnum, RoleEnum } from '../../src/shared/enums';

describe('RecipientResolverService (T006, T025)', () => {
  const service = new RecipientResolverService();
  const event = { studentId: 'student1', professorId: 'prof1', superadminId: 'sa1' };

  it('should resolve student as recipient for booking_created (T009)', () => {
    const recipients = service.resolve(NotificationTypeEnum.BOOKING_CREATED, event);
    expect(recipients).toHaveLength(1);
    expect(recipients[0].recipientRole).toBe(RoleEnum.ALUMNO);
    expect(recipients[0].recipientId).toBe('student1');
  });

  it('should resolve student for booking_confirmed (T010)', () => {
    const recipients = service.resolve(NotificationTypeEnum.BOOKING_CONFIRMED, event);
    expect(recipients[0].recipientRole).toBe(RoleEnum.ALUMNO);
  });

  it('should resolve student for booking_rejected (T010)', () => {
    const recipients = service.resolve(NotificationTypeEnum.BOOKING_REJECTED, event);
    expect(recipients[0].recipientRole).toBe(RoleEnum.ALUMNO);
  });

  it('should resolve admin for admin_pending_alert (T012)', () => {
    const recipients = service.resolve(NotificationTypeEnum.ADMIN_PENDING_ALERT, event);
    expect(recipients).toHaveLength(1);
    expect(recipients[0].recipientRole).toBe(RoleEnum.ADMIN);
    expect(recipients[0].recipientId).toBe('prof1');
  });

  it('should resolve superadmin for exception_alert (T013)', () => {
    const recipients = service.resolve(NotificationTypeEnum.SUPERADMIN_EXCEPTION_ALERT, event);
    expect(recipients).toHaveLength(1);
    expect(recipients[0].recipientRole).toBe(RoleEnum.SUPERADMIN);
  });

  it('should return empty array when studentId missing', () => {
    const recipients = service.resolve(NotificationTypeEnum.BOOKING_CREATED, {});
    expect(recipients).toHaveLength(0);
  });
});
