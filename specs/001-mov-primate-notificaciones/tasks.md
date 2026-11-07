# Tasks: Servicio de notificaciones de MovPrimate

**Input**: Design documents from `/specs/001-mov-primate-notificaciones/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

## Phase 1: Setup

- [ ] T001 Initialize notification microservice and base config
- [ ] T002 Configure event bus and delivery schema
- [ ] T003 [P] Define notification model and delivery log schema
- [ ] T004 [P] Configure retry policy and failure handler

## Phase 2: Foundational

- [ ] T005 Implement event ingestion for booking lifecycle changes
- [ ] T006 Implement recipient resolution by role
- [ ] T007 Implement notification content templates for status updates
- [ ] T008 Implement duplicate detection for repeated events

## Phase 3: User Story 1 - Reservation status notifications (Priority: P1)

- [ ] T009 [P] [US1] Send created/pending notification to student
- [ ] T010 [US1] Send approval/rejection notification to student
- [ ] T011 [US1] Record notification result for delivery audit

## Phase 4: User Story 2 - Admin and superadmin alerts (Priority: P1)

- [ ] T012 [P] [US2] Send pending reservation alerts to admins
- [ ] T013 [US2] Send operational alerts to superadmin for exceptional cases
- [ ] T014 [US2] Restrict alert content by role and authorization scope

## Phase 5: User Story 3 - Reminder flow (Priority: P2)

- [ ] T015 [P] [US3] Schedule or trigger reminder templates before session time
- [ ] T016 [US3] Handle delivery failure and retry logic
- [ ] T017 [US3] Validate reminder message correctness and audience targeting

## Phase 6: Final validation

- [ ] T018 [P] Unit tests for notification templates and dedupe logic
- [ ] T019 Integration tests for event-driven flow
- [ ] T020 Operational tests for retry, fallback, and delivery logging
- [ ] T021 Quickstart validation and documentation

## Tareas globales obligatorias (complementarias)

- [ ] T022 Implementar plantillas de correo para pendiente/confirmado/cancelado/rechazado.
- [ ] T023 Implementar flujo de reenvío de correo de confirmación con idempotencia.
- [ ] T024 Incorporar notificación por evento de asistencia (asistió/no asistió/justificó ausencia).
- [ ] T025 Validar segmentación de destinatarios según rol (superadmin/admin/alumno/usuario).
