import * as express from "express";
import * as cors from "cors";
import { userRoutes } from "./../routes/UserRoutes";
import { messageRoutes } from "./../routes/MessageRoutes";
import { loggerMiddleware } from "../middlewares/LoggerMiddleware";
import { config as dotEnvConfig } from "dotenv";
import { db } from "../models/Database";
import { helloRoutes } from "../routes/HelloRoutes";

export class App {
  express = express();

  constructor() {
    this.config();

    db.connect();
  }

  config() {
    dotEnvConfig();

    this.express.use(cors());
    this.express.use(loggerMiddleware);
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));

    this.express.use("/api/", helloRoutes);
    this.express.use("/api/user", userRoutes);
    this.express.use("/api/message", messageRoutes);
  }
}

export const app = new App();
