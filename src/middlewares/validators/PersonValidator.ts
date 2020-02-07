import { check, body } from "express-validator";
import { errorMessages } from "../../helpers/constants";

const personCreateValidator = [
  check("firstName")
    .notEmpty().withMessage(errorMessages.isRequiredMessage),

  check("lastName")
    .notEmpty().withMessage(errorMessages.isRequiredMessage),

  check("email")
    .notEmpty().withMessage(errorMessages.isRequiredMessage)
    .isEmail().withMessage(errorMessages.isInvalid)
];

const personUpdateValidator = [
  check("email").if(body("email").exists())
    .isEmail().withMessage(errorMessages.isInvalid)
]

export { personCreateValidator, personUpdateValidator }
