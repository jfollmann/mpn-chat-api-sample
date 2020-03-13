import { OK, NO_CONTENT, INTERNAL_SERVER_ERROR, NOT_FOUND } from "http-status-codes";
import { Request, Response } from "express";
import { User } from "../models/User";
import { BaseController } from "./base/BaseController";

export class UserController extends BaseController {

  index = (_req: Request, res: Response) => {
    return User.find()
      .then(users => res.status(OK).json(users))
      .catch(error => res.status(INTERNAL_SERVER_ERROR).json(error))
  }

  store = (req: Request, res: Response) => {
    if (!this.hasError(req, res)) {
      return User.create(req.body)
        .then(user => res.status(OK).json(user))
        .catch(error => res.status(INTERNAL_SERVER_ERROR).json(error))
    }

    return res;
  }

  show = (req: Request, res: Response) => {
    return User.findById(req.params.id)
      .then(user => user ? res.status(OK).json(user) : res.status(NOT_FOUND).send())
      .catch(error => res.status(INTERNAL_SERVER_ERROR).json(error))
  }

  update = (req: Request, res: Response) => {
    if (!this.hasError(req, res)) {
      return User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(user => user ? res.status(OK).json(user) : res.status(NOT_FOUND).send())
        .catch(error => res.status(INTERNAL_SERVER_ERROR).json(error))
    }

    return res;
  }

  destroy = (req: Request, res: Response) => {
    return User.findByIdAndDelete(req.params.id)
      .then(user => user ? res.status(NO_CONTENT).json(user) : res.status(NOT_FOUND).send())
      .catch(error => res.status(INTERNAL_SERVER_ERROR).json(error))
  }
}

export const userController = new UserController();
