import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import selectUserByEmailService from "../../services/users/selectUserByEmailService.js";
import Joi from "joi";

const loginUserController = async (req, res, next) => {
  try {
    const loginUserControllerSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = loginUserControllerSchema.validate(req.body);

    if (error) {
      throw generateErrorsUtils(error.message, 400);
    }

    const { email, password } = req.body;

    if (!email || !password)
      throw generateErrorsUtils("Se esperaba email o contraseña", 400);

    const user = await selectUserByEmailService(email);

    let validPassword;

    if (user) {
      validPassword = await bcrypt.compare(password, user.password);
    }

    if (!user || !validPassword) {
      throw generateErrorsUtils("Usuario o contraseña incorrectos", 401);
    }

    if (!user.active) {
      throw generateErrorsUtils("Usuario pendiente de activacion", 403);
    }

    const tokenInfo = {
      id: user.id,
      role: user.role,
    };

    const token = jwt.sign(tokenInfo, process.env.SECRET, {
      expiresIn: "7d",
    });

    res.send({
      status: "ok",
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

export default loginUserController;
