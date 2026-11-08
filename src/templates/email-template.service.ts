import { Injectable } from '@nestjs/common';
import { NotificationTypeEnum, AttendanceStatusEnum } from '../shared/enums/index.js';

export interface EmailTemplate {
  subject: string;
  body: string;
}

@Injectable()
export class EmailTemplateService {
  getBookingTemplate(type: NotificationTypeEnum, payload: Record<string, any>): EmailTemplate {
    const bookingId = payload.bookingId ?? 'N/A';
    const slotStart = payload.slotStart ?? 'N/A';
    const professorName = payload.professorName ?? 'tu profesor';
    const reason = payload.reason ?? '';

    const templates: Partial<Record<NotificationTypeEnum, EmailTemplate>> = {
      [NotificationTypeEnum.BOOKING_CREATED]: {
        subject: 'Reserva recibida — MovPrimate',
        body: `Tu solicitud de reserva (${bookingId}) para el ${slotStart} con ${professorName} está en revisión. Te notificaremos cuando sea confirmada.`,
      },
      [NotificationTypeEnum.BOOKING_CONFIRMED]: {
        subject: '¡Reserva confirmada — MovPrimate!',
        body: `Tu reserva (${bookingId}) para el ${slotStart} con ${professorName} fue confirmada. ¡Nos vemos en clase!`,
      },
      [NotificationTypeEnum.BOOKING_REJECTED]: {
        subject: 'Reserva rechazada — MovPrimate',
        body: `Tu reserva (${bookingId}) para el ${slotStart} fue rechazada.${reason ? ` Motivo: ${reason}` : ''} Puedes intentar reservar otro horario.`,
      },
      [NotificationTypeEnum.BOOKING_CANCELLED]: {
        subject: 'Reserva cancelada — MovPrimate',
        body: `Tu reserva (${bookingId}) para el ${slotStart} fue cancelada.`,
      },
      [NotificationTypeEnum.ADMIN_PENDING_ALERT]: {
        subject: 'Nueva reserva pendiente de revisión — MovPrimate',
        body: `Tienes una nueva solicitud de reserva (${bookingId}) de un alumno para el ${slotStart}. Por favor revísala en el panel de administración.`,
      },
      [NotificationTypeEnum.SUPERADMIN_EXCEPTION_ALERT]: {
        subject: 'Alerta operativa — MovPrimate',
        body: `Se ha detectado una excepción en el sistema relacionada con la reserva (${bookingId}). Revisa el panel de supervisión.`,
      },
      [NotificationTypeEnum.REMINDER]: {
        subject: 'Recordatorio de clase — MovPrimate',
        body: `Recuerda que tienes una clase el ${slotStart} con ${professorName}. ¡Te esperamos!`,
      },
    };

    return templates[type] ?? { subject: 'Notificación — MovPrimate', body: 'Tienes una notificación pendiente.' };
  }

  getAttendanceTemplate(attendanceStatus: AttendanceStatusEnum, payload: Record<string, any>): EmailTemplate {
    const bookingId = payload.bookingId ?? 'N/A';
    const slotStart = payload.slotStart ?? 'N/A';

    const templates: Record<AttendanceStatusEnum, EmailTemplate> = {
      [AttendanceStatusEnum.ATTENDED]: {
        subject: 'Asistencia registrada — MovPrimate',
        body: `Tu asistencia a la clase del ${slotStart} (reserva ${bookingId}) fue registrada correctamente.`,
      },
      [AttendanceStatusEnum.MISSED]: {
        subject: 'Ausencia registrada — MovPrimate',
        body: `Se registró tu ausencia a la clase del ${slotStart} (reserva ${bookingId}). Si crees que es un error, contacta a tu administrador.`,
      },
      [AttendanceStatusEnum.JUSTIFIED]: {
        subject: 'Ausencia justificada — MovPrimate',
        body: `Tu ausencia a la clase del ${slotStart} (reserva ${bookingId}) fue marcada como justificada.`,
      },
    };

    return templates[attendanceStatus];
  }
}
