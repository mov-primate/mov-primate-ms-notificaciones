# Constitución del microservicio de notificaciones MovPrimate

## Principios fundamentales

### I. Claridad de entrega
Las notificaciones deben informar a alumnos, administradores y superadmins sobre cambios de estado, confirmaciones, rechazos y recordatorios de forma clara y accionable.

### II. Comunicación basada en eventos
El envío de notificaciones debe depender de eventos de dominio y contratos explícitos, evitando acoplamientos ocultos entre servicios. Debe seguir el flujo real de reservas y validaciones.

### III. Fiabilidad por encima del esfuerzo mínimo
Las notificaciones deben procesarse de forma predecible y reintentarse cuando la entrega falle. Debe haber trazabilidad de entregas y errores.

### IV. Contenido consciente de privacidad
Los payloads de notificación no deben filtrar más información de la necesaria para la acción o el destinatario. Deben respetar el nivel de permisos del usuario.

### V. Transparencia operativa
El servicio debe registrar resultados de entrega y facilitar diagnósticos ante fallos. Debe apoyar revisión y auditoría del proceso.

## Restricciones del producto

- Las notificaciones pueden incluir email o mensajes dentro de la app
- Los eventos de reserva deben disparar flujos de comunicación
- El servicio debe soportar notificaciones para alumnos y administradores
- El entorno local usa Docker y MongoDB
- Las notificaciones deben verse desde la plataforma y no depender de WhatsApp

## Flujo de trabajo de desarrollo

- Los requisitos deben especificar qué eventos activan cada notificación.
- Las plantillas de entrega deben revisarse antes de publicarse.
- Los incidentes de notificación deben solucionarse con logs y reintentos.
- El servicio debe mantener alineación con el flujo general de Spec Kit del proyecto.
- Los cambios en eventos de negocio o contenido deben validarse con reservas y permisos.

## Gobernanza

El comportamiento de entrega debe alinear con el flujo de reservas, con la seguridad del sistema y con la separación de roles. Cualquier cambio que afecte contenido, disparador o destinatario debe revisarse antes de fusionarse.

**Versión**: 1.0.1 | **Ratificada**: 2026-11-04 | **Última modificación**: 2026-11-04