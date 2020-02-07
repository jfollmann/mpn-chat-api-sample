import { OK } from "http-status-codes";
import { Request, Response } from "express";

class HelloController {
  index = (_req: Request, res: Response) => {
    return res.status(OK).json({ value: "Hello World" });
  }
}

const helloController = new HelloController();
export { helloController }
