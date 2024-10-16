import express, { NextFunction, Request, Response, Router } from "express";
import { Order } from "../models/orders";
import { requireAuth } from "../middlewares/require-auth";

const router = express.Router();

router.get(
  "/api/orders",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const orders = await Order.find({
      userId: req.currentUser!.id,
    }).populate("ticket");
    res.status(200).send(orders);
  }
);

export { router as indexOrderRouter };
