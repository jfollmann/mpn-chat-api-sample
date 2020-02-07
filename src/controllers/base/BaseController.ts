import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { UNPROCESSABLE_ENTITY } from "http-status-codes";

export class BaseController {

  protected hasError = (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(UNPROCESSABLE_ENTITY).json({ errors: errors.array() });

      return true;
    }

    return false;
  }
}
