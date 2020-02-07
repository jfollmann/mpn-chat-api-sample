import { check, body } from "express-validator";
import { errorMessages } from "../../helpers/constants";

const userCreateValidator = [
  check("name")
    .notEmpty().withMessage(errorMessages.isRequiredMessage),

  check("email")
    .notEmpty().withMessage(errorMessages.isRequiredMessage)
    .isEmail().withMessage(errorMessages.isInvalid)
];

const userUpdateValidator = [
  check("name").if(body("name").exists())
    .notEmpty().withMessage(errorMessages.isRequiredMessage),

  check("email").if(body("email").exists())
    .notEmpty().withMessage(errorMessages.isRequiredMessage)
    .isEmail().withMessage(errorMessages.isInvalid)
]

export { userCreateValidator, userUpdateValidator }
