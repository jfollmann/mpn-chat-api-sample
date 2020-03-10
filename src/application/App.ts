import * as express from "express";
import * as cors from "cors";
import { apiRoutes } from "./ApiRoutes";
import { loggerMiddleware } from "../middlewares/LoggerMiddleware"
import { config as dotEnvConfig } from "dotenv";
import { db } from "../models/Database";

export class App {
  express = express();

  constructor() {
    this.config();
    db.connect();
  }

  config = () => {
    dotEnvConfig();

    this.express.use(cors());
    this.express.use(loggerMiddleware);
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));

    this.express.use("/api", apiRoutes);
  }
}

const app = new App();
export { app }
