import { Message } from "node-nats-streaming";
import { Listener } from "../base-listener";
import { Subjects } from "../subjects";
import { Ticket } from "../../models/ticket";
import { TicketCreatedEvent } from "../ticket-created-event";
import { queueGroupName } from "./queue-group-name";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    const { id, title, price } = data;
    const ticket = Ticket.build({
      id,
      title,
      price,
    });
    await ticket.save();
    msg.ack();
  }
}
