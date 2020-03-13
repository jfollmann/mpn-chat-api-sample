import { OK } from "http-status-codes";
import { Request, Response } from "express";

export class HelloController {
  index = (_req: Request, res: Response) => {
    return res.status(OK).json({ value: "Hello World" });
  }
}

export const helloController = new HelloController();
