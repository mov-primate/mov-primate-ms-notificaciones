import { EmailTemplateService } from '../../src/templates/email-template.service';
import { NotificationTypeEnum, AttendanceStatusEnum } from '../../src/shared/enums';

describe('EmailTemplateService (T007, T022)', () => {
  const service = new EmailTemplateService();
  const payload = { bookingId: 'bk123', slotStart: '2026-11-10 10:00', professorName: 'Prof. García' };

  it('should return subject and body for booking_created', () => {
    const tpl = service.getBookingTemplate(NotificationTypeEnum.BOOKING_CREATED, payload);
    expect(tpl.subject).toContain('Reserva recibida');
    expect(tpl.body).toContain('bk123');
  });

  it('should return subject and body for booking_confirmed', () => {
    const tpl = service.getBookingTemplate(NotificationTypeEnum.BOOKING_CONFIRMED, payload);
    expect(tpl.subject).toContain('confirmada');
    expect(tpl.body).toContain('Prof. García');
  });

  it('should return subject and body for booking_rejected', () => {
    const tpl = service.getBookingTemplate(NotificationTypeEnum.BOOKING_REJECTED, payload);
    expect(tpl.subject).toContain('rechazada');
  });

  it('should return subject and body for booking_cancelled', () => {
    const tpl = service.getBookingTemplate(NotificationTypeEnum.BOOKING_CANCELLED, payload);
    expect(tpl.subject).toContain('cancelada');
  });

  it('should include reason in rejected template if provided', () => {
    const tpl = service.getBookingTemplate(NotificationTypeEnum.BOOKING_REJECTED, { ...payload, reason: 'Cupo lleno' });
    expect(tpl.body).toContain('Cupo lleno');
  });

  it('should return attendance template for attended (T024)', () => {
    const tpl = service.getAttendanceTemplate(AttendanceStatusEnum.ATTENDED, payload);
    expect(tpl.subject).toContain('Asistencia registrada');
  });

  it('should return attendance template for missed', () => {
    const tpl = service.getAttendanceTemplate(AttendanceStatusEnum.MISSED, payload);
    expect(tpl.subject).toContain('Ausencia registrada');
  });

  it('should return attendance template for justified', () => {
    const tpl = service.getAttendanceTemplate(AttendanceStatusEnum.JUSTIFIED, payload);
    expect(tpl.subject).toContain('justificada');
  });
});
