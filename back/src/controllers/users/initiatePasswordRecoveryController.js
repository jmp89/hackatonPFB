import randomstring, { generate } from "randomstring";
import Joi from "joi";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import {
  selectUserByEmailService,
  sendRecoveryCodeEmailService,
  insertRecoveryPassCodeService
} from "../../services/users/index.js";

const initiatePasswordRecoveryController = async (req, res, next) => {
  try {
    const recoveryEmailSchema = Joi.object({
      email: Joi.string().email().required(),
    });

    const { email } = req.body;
    const { error } = recoveryEmailSchema.validate(req.body);

    if (error) {
      throw generateErrorsUtils(error.message, 400);
    };

    const user = await selectUserByEmailService(email);

    if (!user) {
      throw generateErrorsUtils("Usuario no encontrado", 404)
    };

    const recoveryCode = randomstring.generate(10);

    await insertRecoveryPassCodeService(recoveryCode, email);

    await sendRecoveryCodeEmailService(email, recoveryCode);

    res.send({
      status: "ok",
      message: "Se ha enviado un correo electrónico con instrucciones para recuperar la contraseña.",
    });
  } catch (error) {
    next(error);
  }
};

export default initiatePasswordRecoveryController;
