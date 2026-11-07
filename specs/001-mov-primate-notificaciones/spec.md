# Feature Specification: Servicio de notificaciones de MovPrimate

**Feature Branch**: `001-mov-primate-notificaciones`

**Created**: 2026-11-04

**Status**: Draft

**Input**: User description: "Define el servicio de notificaciones para MovPrimate con confirmación, rechazo, recordatorios y avisos de reservas. Debe soportar notificaciones por plataforma y eventos del negocio."

## User Scenarios & Testing

### User Story 1 - Alumno recibe confirmación o rechazo de su reserva (Priority: P1)
El alumno recibe una notificación cuando la reserva cambia de estado o se aprueba/rechaza.

**Why this priority**: La notificación es la confirmación operativa y la base de la transparencia del flujo.

**Independent Test**: Un alumno autenticado puede ver la respuesta del sistema en la plataforma al cambiar el estado de la reserva.

**Acceptance Scenarios**:
1. **Given** que una reserva queda creada, **When** el sistema la procesa, **Then** el alumno recibe una notificación con el estado pendiente o confirmado.
2. **Given** que un administrador rechaza la reserva, **When** la decisión se registra, **Then** el alumno recibe una notificación con el motivo o el resultado.

---

### User Story 2 - Administrador recibe avisos del flujo operativo (Priority: P1)
El profesor o administrador recibe alertas sobre reservas pendientes, conflictos y aprobaciones relevantes.

**Why this priority**: La validación requiere que el administrador sea informado del trabajo que debe atender.

**Independent Test**: Un administrador puede ver notificaciones de nueva reserva y cambios relevantes de su ámbito.

**Acceptance Scenarios**:
1. **Given** que llega una nueva reserva pendiente, **When** el servicio genera el evento, **Then** el administrador recibe la notificación pertinente.
2. **Given** que una reserva queda confirmada, **When** se procesa la actualización, **Then** el administrador recibe el evento correspondiente si aplica.

---

### User Story 3 - Superadmin recibe supervisión y alertas (Priority: P1)
El dueño del gimnasio recibe avisos de excepciones o incidencias críticas del calendario y reservas.

**Why this priority**: El superadmin requiere visibilidad global de riesgos operativos y casos extraordinarios.

**Independent Test**: El superadmin puede consultar alertas de negocio relevantes sin mezclar con la operación del día a día.

**Acceptance Scenarios**:
1. **Given** que existe una excepción de negocio, **When** se detecta, **Then** el superadmin recibe una alerta apropiada.
2. **Given** que la excepción se resuelve, **When** el sistema procesa el cierre, **Then** la notificación relevante se actualiza o deja de emitirse.

---

### User Story 4 - Recordatorios y mensajes accionables (Priority: P2)
El sistema puede enviar recordatorios y avisos de corte para que los alumnos estén informados antes de la sesión.

**Why this priority**: La plataforma debe sostener una comunicación útil y no solo un aviso de estado.

**Independent Test**: Un alumno puede recibir un recordatorio claro antes del horario de la sesión.

**Acceptance Scenarios**:
1. **Given** que una sesión está próxima, **When** el sistema alcanza el umbral de recordatorio, **Then** genera el aviso correspondiente.
2. **Given** que la notificación no puede entregarse, **When** ocurre el fallo, **Then** se registra el error y se hace reintento o fallback según la política.

### Edge Cases

- ¿Qué pasa si el destinatario no existe o no tiene acceso a la plataforma?
- ¿Cómo se comporta el servicio cuando falla un canal de entrega? 
- ¿Qué ocurre si un mismo evento debe enviarse a varios destinatarios? 
- ¿Cómo se maneja una notificación duplicada por reintentos?

## Requirements

### Functional Requirements

- **FR-001**: El servicio DEBE emitir notificaciones por plataforma para confirmación, rechazo, recordatorio y estatus de reserva.
- **FR-002**: El servicio DEBE estar basado en eventos de negocio del dominio de reserva y validación.
- **FR-003**: El servicio DEBE distinguir destinatarios por rol: alumno, administrador/profesor y superadmin.
- **FR-004**: El servicio DEBE registrar el resultado de la entrega y cualquier fallo de notificación.
- **FR-005**: El servicio DEBE evitar duplicados de mensajes para un mismo evento o ciclo de notificación.
- **FR-006**: El servicio DEBE aceptar integración con otros servicios sin depender de WhatsApp ni canales externos para el flujo principal.
- **FR-007**: El servicio DEBE mantener contratos claros con la API o BFF y con el evento de negocio que lo dispara.
- **FR-008**: El servicio DEBE soportar notificaciones accionables y de estado para la experiencia del alumno.

### Key Entities

- **Notificación**: mensaje enviado con contenido, destinatario, canal y resultado.
- **Evento de negocio**: disparador del dominio, por ejemplo reserva creada, confirmada o rechazada.
- **Destinatario**: usuario o rol que recibe la notificación.
- **Canal**: medio de entrega dentro de la plataforma o externo autorizado.
- **Registro de entrega**: auditoría del envío y sus resultados.

## Success Criteria

### Measurable Outcomes

- **SC-001**: El 95% de las notificaciones de reserva se entregan con éxito en la primera intención.
- **SC-002**: El sistema registra y audita cada evento de notificación sin duplicados funcionales.
- **SC-003**: Los alumnos y administradores reciben información útil y oportuna sobre cambios de estado del flujo.
- **SC-004**: El servicio mantiene la responsabilidad de entrega sin acoplarse a canales externos para el flujo principal.
- **SC-005**: El superadmin puede recibir alertas relevantes sin exponer contenido no autorizado.

## Assumptions

- El servicio se integra con eventos de negocio emitidos por la capa de reservas y validación.
- El canal principal es la plataforma y puede incluir correo o notificación interna según la política del producto.
- El servicio puede manejar reintentos y registro para fallos de entrega.
- La seguridad y el alcance de la información se respetan conforme a los roles del sistema.
- Los resultados de entrega se registran para diagnóstico y soporte.

## Reglas globales obligatorias (actualización Notificaciones)

- Debe enviarse correo de confirmación al alumno en cada transición de estado:
  `pendiente`, `confirmado`, `cancelado`, `rechazado`.
- Debe contemplarse contexto de 4 roles (`superadmin`, `admin`, `alumno`, `usuario`) para audiencias correctas.
- Debe enviarse notificación cuando el admin registre asistencia:
  `asistió`, `no asistió`, `justificó ausencia` (si aplica política de producto).
- Debe soportarse reenvío idempotente de correo cuando la operación de confirmación lo requiera.
