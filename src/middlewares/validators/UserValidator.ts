import { body } from "express-validator";
import { errorMessages } from "../../helpers/Constants";

const userCreateValidator = [
  body("name")
    .notEmpty().withMessage(errorMessages.isRequired),

  body("email")
    .notEmpty().withMessage(errorMessages.isRequired)
    .isEmail().withMessage(errorMessages.isInvalid)
];

const userUpdateValidator = [
  body("name").if(body("name").exists())
    .notEmpty().withMessage(errorMessages.isRequired),

  body("email").if(body("email").exists())
    .notEmpty().withMessage(errorMessages.isRequired)
    .isEmail().withMessage(errorMessages.isInvalid)
]

export { userCreateValidator, userUpdateValidator }
