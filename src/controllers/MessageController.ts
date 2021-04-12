import { OK, INTERNAL_SERVER_ERROR, NOT_FOUND } from "http-status-codes";
import { Request, Response } from "express";
import { Message } from "../models/Message";
import { BaseController } from "./base/BaseController";

export class MessageController extends BaseController {

  index = (req: Request, res: Response) => {
    if (!this.hasError(req, res)) {
      const { userTo, userFrom } = req.query;

      return Message.find({
        $or: [
          { $and: [{ userTo }, { userFrom }] },
          { $and: [{ userTo: userFrom }, { userFrom: userTo }] }
        ]
      }, [], { sort: { createdAt: 1 } })
        .populate("userTo")
        .populate("userFrom")
        .then(messages => res.status(OK).json(messages))
        .catch(error => res.status(INTERNAL_SERVER_ERROR).json(error))
    }
    return res;
  }

  store = (req: Request, res: Response) => {
    if (!this.hasError(req, res)) {
      return Message.create(req.body)
        .then(message => res.status(OK).json(message))
        .catch(error => res.status(INTERNAL_SERVER_ERROR).json(error))
    }

    return res;
  }

  update = (req: Request, res: Response) => {
    if (!this.hasError(req, res)) {
      const { content } = req.body;
      return Message.findByIdAndUpdate(req.params.id, { content }, { new: true })
        .then(message => message ? res.status(OK).json(message) : res.status(NOT_FOUND).send())
        .catch(error => res.status(INTERNAL_SERVER_ERROR).json(error))
    }

    return res;
  }
}

export const messageController = new MessageController();
