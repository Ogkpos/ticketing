import { Subjects } from "../subjects";
import { Publisher } from "../base-publisher";
import { ExpirationCompleteEvent } from "../expiration-complete-event";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
