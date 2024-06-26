import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import selectUserByEmailService from "../../services/users/selectUserByEmailService.js";

const loginUserController = async (req, res, next) => {
  try {
    const { email, contraseña } = req.body;

    const user = await selectUserByEmailService(email);

    if (!user) {
      throw generateErrorsUtils("Usuario no encontrado", 404);
    }

    if (!contraseña) {
      throw generateErrorsUtils("Contraseña no encontrada", 404);
    }

    if (contraseña !== user.contraseña) {
      throw generateErrorsUtils("Usuario o contraseña incorrectos", 404);
    }

    res.status(200).json({
      status: "éxito",
      message: "Usuario autenticado correctamente",
    });
  } catch (error) {
    next(error);
  }
};

export default loginUserController;
