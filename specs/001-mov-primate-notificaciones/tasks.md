# Tasks: Servicio de notificaciones de MovPrimate

**Input**: Design documents from `/specs/001-mov-primate-notificaciones/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

## Phase 1: Setup

- [x] T001 Initialize notification microservice and base config
- [x] T002 Configure event bus and delivery schema
- [x] T003 [P] Define notification model and delivery log schema
- [x] T004 [P] Configure retry policy and failure handler

## Phase 2: Foundational

- [x] T005 Implement event ingestion for booking lifecycle changes
- [x] T006 Implement recipient resolution by role
- [x] T007 Implement notification content templates for status updates
- [x] T008 Implement duplicate detection for repeated events

## Phase 3: User Story 1 - Reservation status notifications (Priority: P1)

- [x] T009 [P] [US1] Send created/pending notification to student
- [x] T010 [US1] Send approval/rejection notification to student
- [x] T011 [US1] Record notification result for delivery audit

## Phase 4: User Story 2 - Admin and superadmin alerts (Priority: P1)

- [x] T012 [P] [US2] Send pending reservation alerts to admins
- [x] T013 [US2] Send operational alerts to superadmin for exceptional cases
- [x] T014 [US2] Restrict alert content by role and authorization scope

## Phase 5: User Story 3 - Reminder flow (Priority: P2)

- [x] T015 [P] [US3] Schedule or trigger reminder templates before session time
- [x] T016 [US3] Handle delivery failure and retry logic
- [x] T017 [US3] Validate reminder message correctness and audience targeting

## Phase 6: Final validation

- [x] T018 [P] Unit tests for notification templates and dedupe logic
- [x] T019 Integration tests for event-driven flow
- [x] T020 Operational tests for retry, fallback, and delivery logging
- [x] T021 Quickstart validation and documentation

## Tareas globales obligatorias (complementarias)

- [x] T022 Implementar plantillas de correo para pendiente/confirmado/cancelado/rechazado.
- [x] T023 Implementar flujo de reenvío de correo de confirmación con idempotencia.
- [x] T024 Incorporar notificación por evento de asistencia (asistió/no asistió/justificó ausencia).
- [x] T025 Validar segmentación de destinatarios según rol (superadmin/admin/alumno/usuario).
