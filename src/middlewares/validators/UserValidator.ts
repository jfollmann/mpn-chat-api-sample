import { check, body } from "express-validator";
import { errorMessages } from "../../helpers/Constants";

const userCreateValidator = [
  check("name")
    .notEmpty().withMessage(errorMessages.isRequired),

  check("email")
    .notEmpty().withMessage(errorMessages.isRequired)
    .isEmail().withMessage(errorMessages.isInvalid)
];

const userUpdateValidator = [
  check("name").if(body("name").exists())
    .notEmpty().withMessage(errorMessages.isRequired),

  check("email").if(body("email").exists())
    .notEmpty().withMessage(errorMessages.isRequired)
    .isEmail().withMessage(errorMessages.isInvalid)
]

export { userCreateValidator, userUpdateValidator }
