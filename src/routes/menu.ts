import express, { Request, Response } from "express";
import { MenuController } from "../menu/MenuController";

const router = express.Router();

router.get("/menu", (req: Request, res: Response) =>
  MenuController.getMenu(req, res)
);

export default router;
