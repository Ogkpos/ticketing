import { Message } from "node-nats-streaming";
import { Listener } from "../base-listener";
import { OrderCreatedEvent } from "../order-created-event";
import { Subjects } from "../subjects";
import { OrderStatus } from "../types/order-status";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/tickets";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    //find ticket order is reserving
    const ticket = await Ticket.findById(data.ticket.id);
    //if ono ticket, throw error
    if (!ticket) {
      throw new Error("Ticket not found");
    }
    //mark tickket as being reserved by setting its orderid prop
    ticket.set({ orderId: data.id });
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
