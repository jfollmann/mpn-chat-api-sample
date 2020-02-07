import { Request, Response, NextFunction } from "express";

const loggerMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.originalUrl}`);

  next();
}

export { loggerMiddleware }
