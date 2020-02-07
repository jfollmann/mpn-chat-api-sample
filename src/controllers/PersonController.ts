import { OK, NO_CONTENT, UNPROCESSABLE_ENTITY, INTERNAL_SERVER_ERROR, NOT_FOUND } from "http-status-codes";
import { Request, Response } from "express";
import { Person } from "../models/Person";
import { validationResult } from "express-validator";

class PersonController {

  private hasError = (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(UNPROCESSABLE_ENTITY).json({ errors: errors.array() });

      return true;
    }

    return false;
  }

  index = (_req: Request, res: Response) => {
    return Person.find()
      .then(p => res.status(OK).json(p))
      .catch(e => res.status(INTERNAL_SERVER_ERROR).json(e))
  }

  store = (req: Request, res: Response) => {
    if (!this.hasError(req, res)) {
      const { firstName, lastName, email } = req.body;
      // return Person.create(req.body)
      return Person.create({ firstName, lastName, email })
        .then(p => res.status(OK).json(p))
        .catch(e => res.status(INTERNAL_SERVER_ERROR).json(e))
    }

    return;
  }

  show = (req: Request, res: Response) => {
    return Person.findById(req.params.id)
      .then(p => p ? res.status(OK).json(p) : res.status(NOT_FOUND).send())
      .catch(e => res.status(INTERNAL_SERVER_ERROR).json(e))
  }

  update = (req: Request, res: Response) => {
    if (!this.hasError(req, res)) {
      return Person.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(p => p ? res.status(OK).json(p) : res.status(NOT_FOUND).send())
        .catch(e => res.status(INTERNAL_SERVER_ERROR).json(e))
    }

    return;
  }

  destroy = (req: Request, res: Response) => {
    return Person.findByIdAndDelete(req.params.id)
      .then(p => p ? res.status(NO_CONTENT).json(p) : res.status(NOT_FOUND).send())
      .catch(e => res.status(INTERNAL_SERVER_ERROR).json(e))
  }
}

const personController = new PersonController();
export { personController }
