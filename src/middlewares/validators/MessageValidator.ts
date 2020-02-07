import { check, query } from "express-validator";
import { errorMessages } from "../../helpers/Constants";
import { User } from "../../models/User";

const messageListValidator = [
  query("userTo")
    .notEmpty().withMessage(errorMessages.isRequired).bail()
    .isMongoId().withMessage(errorMessages.isNotObjectId).bail()
    .custom((value) => {
      return User.exists({ _id: value })
        .then(exists => exists ? true : Promise.reject(errorMessages.isNotFound))
    }),

  query("userFrom")
    .notEmpty().withMessage(errorMessages.isRequired).bail()
    .isMongoId().withMessage(errorMessages.isNotObjectId).bail()
    .custom((value) => {
      return User.exists({ _id: value })
        .then(exists => exists ? true : Promise.reject(errorMessages.isNotFound))
    }),
]

const messageCreateValidator = [
  check("userTo")
    .isMongoId().withMessage(errorMessages.isNotObjectId).bail()
    .notEmpty().withMessage(errorMessages.isRequired)
    .custom((value) => {
      return User.exists({ _id: value })
        .then(exists => exists ? true : Promise.reject(errorMessages.isNotFound))
    }),

  check("userFrom")
    .isMongoId().withMessage(errorMessages.isNotObjectId).bail()
    .notEmpty().withMessage(errorMessages.isRequired)
    .custom((value) => {
      return User.exists({ _id: value })
        .then(exists => exists ? true : Promise.reject(errorMessages.isNotFound))
    }),

  check("content")
    .notEmpty().withMessage(errorMessages.isRequired)
];

const messageUpdateValidator = [
  check("content")
    .notEmpty().withMessage(errorMessages.isRequired)
]

export { messageListValidator, messageCreateValidator, messageUpdateValidator }
