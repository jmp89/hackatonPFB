import randomstring from "randomstring";
import Joi from "joi";

import {insertUserService} from "../../services/users/index.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const registerUserController = async (req, res, next) => {
  try {
    const userRegisterSchema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{4,30}$"))
        .required(),
    });
    const { username, email, password } = req.body;
    const registrationCode = randomstring.generate(15);
    const { error } = userRegisterSchema.validate(req.body);

    if (error) {
      throw generateErrorsUtils(error.message, 400);
    }

    await insertUserService(username, email, password, registrationCode);
    res.send({
      status: "ok",
      message: "Usuario registrado correctamente, se ha enviado un email de activación.",
    });
  } catch (error) {
    next(error);
  }
};

export default registerUserController;
