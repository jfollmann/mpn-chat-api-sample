import { Request, Response, NextFunction } from "express";
import { hostname } from "os";

export const loggerMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  console.log(`[Host: ${hostname()}] - ${req.method} ${req.originalUrl}`);

  next();
}
