# Data Model: Servicio de notificaciones

- Notification: id, type, recipientId, payload, status
- DeliveryAttempt: notificationId, attempt, result, timestamp
- EventFingerprint: eventId, hash, processedAt
- MailConfirmation: bookingId, studentId, bookingStatus, sentAt, resendCount

Reglas:
- no duplicar notificación por mismo evento.
- registrar resultado de entrega.
- permitir reenvío de correo con deduplicación por estado y reserva.
