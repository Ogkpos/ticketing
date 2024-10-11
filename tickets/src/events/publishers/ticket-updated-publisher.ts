import { Publisher } from "../base-publisher";
import { TicketUpdatedEvent } from "../ticket-updated-event";
import { Subjects } from "../subjects";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
