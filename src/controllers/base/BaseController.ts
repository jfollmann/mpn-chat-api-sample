import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { UNPROCESSABLE_ENTITY } from "http-status-codes";

export class BaseController {

  validationRequest(req: Request) { return validationResult(req) };

  hasError = (req: Request, res: Response) => {
    const errors = this.validationRequest(req);
    if (!errors.isEmpty()) {
      res.status(UNPROCESSABLE_ENTITY).json({ errors: errors.array() });

      return true;
    }

    return false;
  }
}
