import * as express from "express";
import { helloController } from "./controllers/HelloController"

import { userController } from "./controllers/UserController"
import { messageController } from "./controllers/MessageController"

import { userCreateValidator, userUpdateValidator } from "./middlewares/validators/UserValidator";
import { messageCreateValidator, messageUpdateValidator, messageListValidator } from "./middlewares/validators/MessageValidator";

const routes: express.Router = express.Router();

routes.get("/", helloController.index);

//user routes
routes.get("/user", userController.index);
routes.post("/user", userCreateValidator, userController.store);
routes.get("/user/:id", userController.show);
routes.put("/user/:id", userUpdateValidator, userController.update);
routes.delete("/user/:id", userController.destroy);

//message routes
routes.get("/message", messageListValidator, messageController.index);
routes.post("/message", messageCreateValidator, messageController.store);
routes.put("/message/:id", messageUpdateValidator, messageController.update);

export { routes }
