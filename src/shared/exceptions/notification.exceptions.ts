export class DuplicateEventException extends Error {
  code = 'ERR_DUPLICATE_EVENT';
  statusCode = 409;
  constructor(msg = 'Evento ya fue procesado (deduplicación)') { super(msg); this.name = 'DuplicateEventException'; }
}
export class DeliveryFailedException extends Error {
  code = 'ERR_DELIVERY_FAILED';
  statusCode = 502;
  constructor(msg = 'Fallo en la entrega de notificación') { super(msg); this.name = 'DeliveryFailedException'; }
}
export class MaxRetriesExceededException extends Error {
  code = 'ERR_MAX_RETRIES_EXCEEDED';
  statusCode = 500;
  constructor(msg = 'Se superaron los reintentos máximos') { super(msg); this.name = 'MaxRetriesExceededException'; }
}
