import selectEventByCode from "../../services/users/selectEventByCode.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import Joi from "joi";

const eventRegistrationController = async (req, res, next) => {
  const eventRegistrationSchema = Joi.object({
    codigo: Joi.string().required(),
  });

  try {
    const { error } = eventRegistrationSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.message);
    }

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
