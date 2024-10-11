import { Publisher } from "../base-publisher";
import { OrderCancelledEvent } from "../order-cancelled-event";
import { Subjects } from "../subjects";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
