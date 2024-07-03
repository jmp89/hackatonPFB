import sendRecoveryCodeEmailService from "../../controllers/users/sendRecoveryCodeEmailService.js";
import selectUserByEmailService from "../../services/users/selectUserByEmailService.js";
import getPool from "../../database/getPool.js";
import randomstring from "randomstring";
import Joi from "joi";


const initiatePasswordRecoveryController = async (req, res, next) => {
  try {
    const recoveryEmailSchema = Joi.object({
      email: Joi.string().email().required(),
    });

    const { email } = req.body;
    const { error } = recoveryEmailSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error.message);
    }

    const user = await selectUserByEmailService(email);

    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }

    const recoveryCode = randomstring.generate(10);
    const pool = await getPool();

    await pool.query(
      `
      UPDATE users
      SET recover_pass_code=?
      WHERE email=?
      `,
      [recoveryCode, email]
    );

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
