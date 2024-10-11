import { Message } from "node-nats-streaming";
import { Listener } from "../base-listener";
import { OrderCancelledEvent } from "../order-cancelled-event";
import { Subjects } from "../subjects";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/tickets";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    //find ticket order is reserving
    const ticket = await Ticket.findById(data.ticket.id);
    //if no ticket, throw error
    if (!ticket) {
      throw new Error("Ticket not found");
    }
    //mark tickket as being un-reserved by setting its orderid prop
    ticket.set({ orderId: undefined });
    //save ticket
    await ticket.save();
    //publish an event
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      version: ticket.version,
      title: ticket.title,
      userId: ticket.userId,
      orderId: ticket.orderId,
      price: ticket.price,
    });
    //ack the messqge
    msg.ack();
  }
}
