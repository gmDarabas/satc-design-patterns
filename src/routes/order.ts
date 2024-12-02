import express, { Request, Response } from "express";
import { OrderController } from "../order/OrderController";

const router = express.Router();

router.post("/order", (req: Request, res: Response) => {
  return OrderController.createOrder(req, res);
});

router.patch("/order/:id/advance", (req: Request, res: Response) => {
  OrderController.advanceOrder(req, res);
});

export default router;
