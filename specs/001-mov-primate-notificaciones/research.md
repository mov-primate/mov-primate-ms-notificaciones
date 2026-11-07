# Research: Servicio de notificaciones

## Decisiones clave

1. Notificaciones por plataforma como canal principal.
2. Eventos de reserva disparan envíos.
3. Dedupe obligatorio por evento.
4. Registro de fallos y reintentos.

## Resultado

Entrega confiable de estado para alumno, admin y superadmin.

## Reglas globales incorporadas

- Correo de confirmación por estados: pendiente, confirmado, cancelado, rechazado.
- Soporte de reenvío idempotente de correo.
- Eventos de asistencia para informar al alumno según política.
