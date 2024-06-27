import selectEventByCode from "../../services/users/selectEventByCode.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const eventRegistrationController = async (req, res, next) => {
  try {
    const { codigo } = req.body;

    const evento = await selectEventByCode(codigo);

    if (!evento) {
      throw generateErrorsUtils("No se ha encontrado el evento", 401);
    }

    res.status(200).json({
      status: 200,
      message: "Te has inscrito con éxito",
    });
  } catch (error) {
    next(error);
  }
};

export default eventRegistrationController;
