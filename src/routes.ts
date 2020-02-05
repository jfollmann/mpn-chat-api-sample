import * as express from "express";
import { helloController } from "./controllers/HelloController"
import { personController } from "./controllers/PersonController"

const routes = express.Router();

routes.get("/", helloController.index);

routes.get("/person", personController.index);
routes.post("/person", personController.store);
routes.get("/person/:id", personController.show);
routes.put("/person/:id", personController.update);
routes.delete("/person/:id", personController.destroy);

export { routes }
