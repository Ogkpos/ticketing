import { Message } from "node-nats-streaming";
import { Listener } from "../base-listener";
import { OrderCreatedEvent } from "../order-created-event";
import { Subjects } from "../subjects";
import { queueGroupName } from "./queue-group-name";
import { Order } from "../../models/orders";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const order = Order.build({
      id: data.id,
      price: data.ticket.price,
      status: data.status,
      userId: data.userId,
      version: data.version,
    });
    await order.save();
    msg.ack();
  }
}
