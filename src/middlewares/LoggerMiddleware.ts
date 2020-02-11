import { Request, Response, NextFunction } from "express";
import { hostname } from "os";

const loggerMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.originalUrl} - host: ${hostname()}`);

  next();
}

export { loggerMiddleware }
