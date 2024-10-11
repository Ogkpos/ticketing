import { natsWrapper } from "../../../nats-wrapper";
import { OrderCreatedListener } from "../order-created-listener";
import { Ticket } from "../../../models/tickets";
import { OrderCreatedEvent } from "../../order-created-event";
import mongoose from "mongoose";
import { OrderStatus } from "../../types/order-status";
import { Message } from "node-nats-streaming";

const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);
  const ticket = Ticket.build({
    title: "Tasks",
    price: 89,
    userId: "8ynn",
  });
  await ticket.save();

  const data: OrderCreatedEvent["data"] = {
    id: "66ffbe2ba6559510ac0e3da7",
    version: 0,
    status: OrderStatus.Created,
    userId: "8hbje",
    expiresAt: "string",
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  return { listener, ticket, data, msg };
};

it("sets the userId of the ticket", async () => {
  const { listener, data, ticket, msg } = await setup();
  await listener.onMessage(data, msg);

  const updatedData = await Ticket.findById(ticket.id);

  expect(updatedData!.orderId).toEqual(data.id);
});
it("acks the message", async () => {
  const { listener, data, ticket, msg } = await setup();
  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});

it("publishes a ticket updated event", async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);
  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const ticketUpdatedData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );

  expect(data.id).toEqual(ticketUpdatedData.orderId);
});
