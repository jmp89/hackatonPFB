import {updateUserRegCodeService} from "../../services/users/index.js";

const validateUserController = async (req, res, next) => {
  try {
    const { registrationCode } = req.params;

    await updateUserRegCodeService(registrationCode);

    res.send({
      status: "ok",
      message: "Usuario activado correctamente",
    });
  } catch (error) {
    next(error);
  }
};

export default validateUserController;
