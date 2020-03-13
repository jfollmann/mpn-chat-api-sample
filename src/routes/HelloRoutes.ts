import { Request, Response, Router } from "express";
import { helloController } from "../controllers/HelloController";

export class HelloRoutes {
  routes: Router = Router();

  index = (req: Request, res: Response) => {
    return helloController.index(req, res);
  }

  constructor() {
    this.routes.get("/", this.index);
  }
}

export const helloRoutes = new HelloRoutes().routes;
