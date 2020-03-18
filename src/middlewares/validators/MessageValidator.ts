import { body, query } from "express-validator";
import { errorMessages } from "../../helpers/Constants";
import { User } from "../../models/User";

const messageListValidator = [
  query("userTo")
    .notEmpty().withMessage(errorMessages.isRequired).bail()
    .isMongoId().withMessage(errorMessages.isNotObjectId).bail()
    .custom((value) => {
      return User.exists({ _id: value })
        .then((exists) => {
          return exists ? Promise.resolve(true) : Promise.reject(errorMessages.isNotFound)
        })
    }),

  query("userFrom")
    .notEmpty().withMessage(errorMessages.isRequired).bail()
    .isMongoId().withMessage(errorMessages.isNotObjectId).bail()
    .custom((value) => {
      return User.exists({ _id: value })
        .then((exists) => {
          return exists ? Promise.resolve(true) : Promise.reject(errorMessages.isNotFound)
        })
    })
]

const messageCreateValidator = [
  body("userTo")
    .notEmpty().withMessage(errorMessages.isRequired).bail()
    .isMongoId().withMessage(errorMessages.isNotObjectId).bail()
    .custom((value: any) => {
      return User.exists({ _id: value })
        .then(exists => exists ? Promise.resolve(true) : Promise.reject(errorMessages.isNotFound))
    }),

  body("userFrom")
    .notEmpty().withMessage(errorMessages.isRequired).bail()
    .isMongoId().withMessage(errorMessages.isNotObjectId).bail()
    .custom((value: any) => {
      return User.exists({ _id: value })
        .then(exists => exists ? Promise.resolve(true) : Promise.reject(errorMessages.isNotFound))
    }),

  body("content")
    .notEmpty().withMessage(errorMessages.isRequired)
];

const messageUpdateValidator = [
  body("content")
    .notEmpty().withMessage(errorMessages.isRequired)
]

export { messageListValidator, messageCreateValidator, messageUpdateValidator }
