import { Listener } from "./base-listener";
import { Message } from "node-nats-streaming";
import { OrderCreatedEvent } from "./order-created-event";
import { Subjects } from "./subjects";

//export class TicketCreatedListener extends Listener<OrderCreatedEvent> {
//  readonly subject = Subjects.OrderCreated;
//  queueGroupName: string = "payemnts-service";
//  onMessage(data: OrderCreatedEvent["data"], msg: Message): void {
//    console.log("Event data", data);
//    msg.ack();
//  }
//}
