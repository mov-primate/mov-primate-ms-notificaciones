# Requirements Quality Checklist: Servicio de notificaciones de MovPrimate

**Purpose**: Validar que la capa de notificación entregue mensajes útiles, seguros y trazables para el flujo de reservas.
**Created**: 2026-11-04
**Feature**: [spec.md](./spec.md)

## Entrega de mensajes

- [ ] CHK001 El sistema entrega notificaciones por plataforma para confirmación, rechazo, recordatorio y estatus.
- [ ] CHK002 Los eventos de negocio disparan las notificaciones adecuadas.
- [ ] CHK003 Se evita la duplicación funcional de mensajes para el mismo evento.
- [ ] CHK004 Los fallos de entrega quedan registrados y son reintentados según política.

## Roles y alcance

- [ ] CHK005 El alumno, el administrador/profesor y el superadmin reciben la información adecuada según su rol.
- [ ] CHK006 La notificación no expone contenido no autorizado a usuarios sin permisos.
- [ ] CHK007 El servicio mantiene una separación clara entre alertas del flujo y alertas operativas.

## Operabilidad

- [ ] CHK008 La solución no depende de WhatsApp ni de canales externos para el ciclo principal.
- [ ] CHK009 La infraestructura local Docker y el despliegue objetivo en AWS soportan el servicio.
- [ ] CHK010 Los eventos y registros de entrega permiten diagnóstico, soporte y auditoría.

## Reglas globales a verificar

- [ ] CHK011 Se envía correo de confirmación al alumno por cada estado: pendiente/confirmado/cancelado/rechazado.
- [ ] CHK012 Existe capacidad de reenvío idempotente de correo de confirmación.
- [ ] CHK013 Se manejan eventos de asistencia (asistió/no asistió/justificó ausencia) para notificación si corresponde.
- [ ] CHK014 La audiencia y contenido respetan roles: superadmin/admin/alumno/usuario.
