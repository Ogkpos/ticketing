import { Publisher } from "../base-publisher";
import { PaymentCreatedEvent } from "../payment-created-event";
import { Subjects } from "../subjects";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
