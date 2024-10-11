import express, { Request, Response } from "express";
import { Ticket } from "../models/tickets";
import { NotFoundError } from "../errors/not-found-error";

const router = express.Router();

router.get("/api/tickets/:id", async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError();
  }

  res.status(200).send(ticket);
});

export { router as showTicketRouter };
