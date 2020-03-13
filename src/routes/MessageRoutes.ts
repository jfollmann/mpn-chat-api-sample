import { Request, Response, Router } from "express";
import { messageController } from "../controllers/MessageController"

import { messageCreateValidator, messageUpdateValidator, messageListValidator } from "../middlewares/validators/MessageValidator";

export class MessageRoutes {
  routes: Router = Router();

  index = (req: Request, res: Response) => {
    return messageController.index(req, res);
  }

  store = (req: Request, res: Response) => {
    return messageController.store(req, res);
  }

  update = (req: Request, res: Response) => {
    return messageController.update(req, res);
  }

  constructor() {
    this.routes.get("/", messageListValidator, this.index);
    this.routes.post("/", messageCreateValidator, this.store);
    this.routes.put("/:id", messageUpdateValidator, this.update);
  }
}

export const messageRoutes = new MessageRoutes().routes;
