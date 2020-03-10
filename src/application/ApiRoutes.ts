import * as express from "express";
import { helloController } from "../controllers/HelloController"

import { userController } from "../controllers/UserController"
import { messageController } from "../controllers/MessageController"

import { userCreateValidator, userUpdateValidator } from "../middlewares/validators/UserValidator";
import { messageCreateValidator, messageUpdateValidator, messageListValidator } from "../middlewares/validators/MessageValidator";

class ApiRoutes {
  routes: express.Router;

  constructor() {
    this.routes = express.Router();

    this.routes.get("/", helloController.index);

    //user routes
    this.routes.get("/user", userController.index);
    this.routes.post("/user", userCreateValidator, userController.store);
    this.routes.get("/user/:id", userController.show);
    this.routes.put("/user/:id", userUpdateValidator, userController.update);
    this.routes.delete("/user/:id", userController.destroy);

    //message routes
    this.routes.get("/message", messageListValidator, messageController.index);
    this.routes.post("/message", messageCreateValidator, messageController.store);
    this.routes.put("/message/:id", messageUpdateValidator, messageController.update);
  }
}

const apiRoutes = new ApiRoutes().routes;
export { apiRoutes }
