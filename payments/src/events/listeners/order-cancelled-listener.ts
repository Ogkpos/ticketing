import { Message } from "node-nats-streaming";
import { Listener } from "../base-listener";
import { OrderCancelledEvent } from "../order-cancelled-event";
import { Subjects } from "../subjects";
import { queueGroupName } from "./queue-group-name";
import { Order } from "../../models/orders";
import { OrderStatus } from "../types/order-status";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;
  async onMessage(
    data: { id: string; version: number; ticket: { id: string } },
    msg: Message
  ) {
    const order = await Order.findOne({
      _id: data.id,
      version: data.version - 1,
    });
    if (!order) {
      throw new Error("Order not found");
    }
    order.set({
      status: OrderStatus.Cancelled,
    });
    await order.save();

    msg.ack();
  }
}
