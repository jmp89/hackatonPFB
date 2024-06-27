import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import selectUserByEmailService from "../../services/users/selectUserByEmailService.js";

const loginUserController = async (req, res, next) => {
  try {
    const { email, contraseña } = req.body;

    if (!email || !contraseña)
      throw generateErrorsUtils("Se esperaba email o password", 400);

    const user = await selectUserByEmailService(email);

    let validPassword;

    if (!user) {
      validPassword = await bcrypt.compare(contraseña, user.contraseña);
    }

    if (!user.active) {
      throw generateErrorsUtils("Usuario pendiente de activacion", 403);
    }

    const tokenInfo = {
      id: user.id,
      role: user.role,
    };

    const token = jwt.sign(tokenInfo, process.env.SECRET, {
      expiresIn: "3d",
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
