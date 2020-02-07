import * as express from "express";
import { helloController } from "./controllers/HelloController"
import { personController } from "./controllers/PersonController"
import { personCreateValidator, personUpdateValidator } from "./middlewares/validators/PersonValidator";

const routes: express.Router = express.Router();

routes.get("/", helloController.index);

routes.get("/person", personController.index);
routes.post("/person", personCreateValidator, personController.store);
routes.get("/person/:id", personController.show);
routes.put("/person/:id", personUpdateValidator, personController.update);
routes.delete("/person/:id", personController.destroy);

export { routes }
