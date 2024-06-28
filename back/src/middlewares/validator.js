import { body } from "express-validator";

const validator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("El email no puede estar vacio")
      .isEmail()
      .withMessage("Ingrese un email valido"),

    body("password")
      .trim()
      .notEmpty()
      .withMessage("El password no puede estar vacio")
      .isLength({ min: 3, max: 6 })
      .withMessage("El password debe tener entre 3 y 6 caracteres"),
  ];
};

export default validator;
