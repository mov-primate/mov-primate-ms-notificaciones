# Implementation Plan: Servicio de notificaciones de MovPrimate

**Branch**: `001-mov-primate-notificaciones` | **Date**: 2026-11-04 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-mov-primate-notificaciones/spec.md`

## Summary

El servicio de notificaciones de MovPrimate entrega confirmaciones, rechazos, recordatorios y avisos relacionados con reservas. Debe servirse de eventos de negocio y de canales dentro de la plataforma para no depender de WhatsApp ni de mensajes externos como mecanismo principal. El servicio debe distinguir usuarios por rol y asegurar que el alumno, el administrador/profesor y el superadmin reciban la información correcta en cada caso.

## Technical Context

**Language/Version**: TypeScript, NestJS 12

**Primary Dependencies**: NestJS, MongoDB or event log storage, event-driven integration, delivery/retry pipeline

**Storage**: MongoDB or event store for notifications and delivery logs

**Testing**: Unit tests for formatting and retry logic; integration tests for event-driven delivery

**Target Platform**: Notification microservice within local Docker Compose and AWS deployment model

**Project Type**: Microservice

**Performance Goals**: Reliable delivery of status updates and reminders without duplicates or broken workflows

**Constraints**:
- Platform-first notifications only, no WhatsApp dependency
- Duplicate prevention must be enforced
- Delivery failures must be logged and retried
- Admin and superadmin alerting must respect scope and permissions

**Scale/Scope**:
- Reservation created, approved, rejected and reminder events
- Delivery logs and retry behavior
- Role-based recipients
- Operational alerting for supervisors

## Constitution Check

*GATE: Must pass before implementation.*

- Notifications depend on business events, not direct user messaging outside the system: PASS
- Role-based delivery is explicit and secure: PASS
- Duplicate prevention and audit are required: PASS
- Platform-first communication is maintained: PASS
- No constitutional violations identified

## Project Structure

### Documentation (this feature)

```text
specs/001-mov-primate-notificaciones/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── events/
├── notifications/
├── recipients/
├── delivery/
├── retry/
├── audit/
└── shared/

tests/
├── unit/
├── integration/
└── contract/
```

**Structure Decision**: The notification service will follow an event-driven flow with an explicit delivery and audit pipeline so messages are traceable and resilient.

## Complexity Tracking

No constitutional violations were identified, so no complexity exceptions are required.

## Addendum de alcance obligatorio

- Plantillas de correo por estado de reserva: pendiente/confirmado/cancelado/rechazado.
- Reenvío controlado de correo de confirmación con deduplicación.
- Manejo de notificaciones para cambios de asistencia registrados por admin.
- Segmentación de destinatarios alineada a 4 roles del sistema.
