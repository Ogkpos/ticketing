import { Message } from "node-nats-streaming";
import { Listener } from "../base-listener";
import { Subjects } from "../subjects";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedEvent } from "../ticket-updated-event";
import { queueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;

  queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    // const ticket = await Ticket.findOne({
    // _id: data.id,
    // version: data.version - 1,
    // });
    const ticket = await Ticket.findbyEvent(data);

    if (!ticket) {
      throw new Error("Ticket not found");
    }
    const { title, price } = data;
    ticket.set({ title, price });
    await ticket.save();
    msg.ack();
  }
}
