import express, { NextFunction, Request, Response, Router } from "express";
import { Ticket } from "../models/tickets";

const router = express.Router();

router.get(
  "/api/tickets",
  async (req: Request, res: Response, next: NextFunction) => {
    const tickets = await Ticket.find({
      orderId: undefined,
    });
    res.status(200).send(tickets);
  }
);

export { router as indexTicketRouter };
