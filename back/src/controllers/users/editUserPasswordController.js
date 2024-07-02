import updateUserPassService from "../../services/users/updateUserPassService.js";
import Joi from "joi";

const editUserPasswordController = async (req, res, next) => {
  try {
    const Schema = Joi.object({
      email: Joi.string().email().required(),
      recoverPassCode: Joi.string().required(),
      newPassword: Joi.string().required(),
    });

    const { error } = Schema.validate(req.body);

    if (error) {
      throw generateErrorsUtils(error.message, 400);
    }
    const { email, recoverPassCode, newPassword } = req.body;

    await updateUserPassService(email, recoverPassCode, newPassword);

    res.send({
      status: "ok",
      message: "Contraseña actualizada",
    });
  } catch (error) {
    next(error);
  }
};

export default editUserPasswordController;
