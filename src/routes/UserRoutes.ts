import { Request, Response, Router } from "express";
import { userController } from "../controllers/UserController"

import { userCreateValidator, userUpdateValidator } from "../middlewares/validators/UserValidator";

export class UserRoutes {
  routes: Router = Router();

  index = (req: Request, res: Response) => {
    return userController.index(req, res);
  }

  store = (req: Request, res: Response) => {
    return userController.store(req, res);
  }

  show = (req: Request, res: Response) => {
    return userController.show(req, res);
  }

  update = (req: Request, res: Response) => {
    return userController.update(req, res);
  }

  destroy = (req: Request, res: Response) => {
    return userController.destroy(req, res);
  }

  constructor() {
    this.routes.get("/", this.index);
    this.routes.post("/", userCreateValidator, this.store);
    this.routes.get("/:id", this.show);
    this.routes.put("/:id", userUpdateValidator, this.update);
    this.routes.delete("/:id", this.destroy);
  }
}

export const userRoutes = new UserRoutes().routes;
