import express from "express";

import { Router, Request, Response } from "express";
import menu from "./routes/menu";
import order from "./routes/order";

const app = express();
const route = Router();

app.use(express.json());
app.use("/api", menu);
app.use("/api", order);

route.get("/", (req: Request, res: Response) => {
  res.json({ message: "Api funcionando" });
});

app.use(route);

app.listen(3000, () => console.log("server running on port 3000"));
