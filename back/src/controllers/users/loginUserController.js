import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import {selectUserByEmailService} from "../../services/users/index.js";
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

    const user = await selectUserByEmailService(email);

    let validPassword;

    if (user) {
      validPassword = await bcrypt.compare(password, user.password);
    }

    if (!user || !validPassword) {
      throw generateErrorsUtils("Usuario o contraseña incorrectos", 401);
    }

    if (!user.active) {
      throw generateErrorsUtils("Usuario pendiente de activación", 403);
    }

    const tokenInfo = {
      id: user.id,
      role: user.role,
    };

    const token = jwt.sign(tokenInfo, process.env.SECRET, {
      expiresIn: 60 * 15,
    });

    const refreshToken = jwt.sign(tokenInfo, process.env.REFRESH_SECRET, {
      expiresIn: "7d",
    });

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .send({
        status: "ok",
        token: token,
      });

  } catch (error) {
    next(error);
  }
};

export default loginUserController;