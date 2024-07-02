import randomstring from "randomstring";
import insertUserService from "../../services/users/insertUserServices.js";
import Joi from "joi";

const registerUserController = async (req, res, next) => {
  try {
    const userRegisterSchema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        // Caracteres permitidos: Alfanúmericos, mínimo 8 y máximo 30
        .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
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
      message: "Usuario registrado correctamente.",
    });
  } catch (error) {
    next(error);
  }
};

export default registerUserController;
