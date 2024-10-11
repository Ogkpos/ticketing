import express, { Request, Response } from "express";

import { Order } from "../models/orders";
import { requireAuth } from "../middlewares/require-auth";

import { NotFoundError } from "../errors/not-found-error";
import { NotAuthorizedError } from "../errors/not-authorized-error";

const router = express.Router();

router.get("/api/orders/:orderId", requireAuth, async (req, res) => {
  const order = await Order.findById(req.params.orderId).populate("ticket");
  if (!order) {
    throw new NotFoundError();
  }

  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }
  res.status(200).send(order);
});

export { router as showOrderRouter };
