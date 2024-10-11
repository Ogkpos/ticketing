import { Publisher } from "../base-publisher";
import { OrderCreatedEvent } from "../order-created-event";
import { Subjects } from "../subjects";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
