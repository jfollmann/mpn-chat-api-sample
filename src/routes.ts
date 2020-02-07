import * as express from "express";
import { helloController } from "./controllers/HelloController"
import { userController } from "./controllers/UserController"
import { userCreateValidator, userUpdateValidator } from "./middlewares/validators/UserValidator";

const routes: express.Router = express.Router();

routes.get("/", helloController.index);

routes.get("/user", userController.index);
routes.post("/user", userCreateValidator, userController.store);
routes.get("/user/:id", userController.show);
routes.put("/user/:id", userUpdateValidator, userController.update);
routes.delete("/user/:id", userController.destroy);

export { routes }
