import createEventAdminService from "../../services/entries/createEventAdminService.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import Joi from "joi";
const createEventAdminController = async (req, res, next) => {
  try {
    const createEventAdminSchema = Joi.object({
      nombre: Joi.string().required(),
      tecnologia: Joi.string().required(),
      online_presencial: Joi.string().required(),
      ciudad: Joi.string().allow(null),
      rango_fechas: Joi.date().required(),
      tematica: Joi.string().required(),
      organizador: Joi.number().integer().required(),
      descripcion: Joi.string().min(15).max(255).required(),
    });

    const { error } = createEventAdminSchema.validate(req.body);

    if (error) {
      throw generateErrorsUtils(error.message, 400);
    }
    const {
      nombre,
      tecnologia,
      online_presencial,
      ciudad,
      rango_fechas,
      tematica,
      organizador,
      descripcion,
    } = req.body;

    if (
      !nombre ||
      !tecnologia ||
      !online_presencial ||
      !rango_fechas ||
      !tematica ||
      !descripcion
    ) {
      const err = generateErrorsUtils("Faltan campos por rellenar.", 401);
      throw err;
    }

    if (online_presencial === "presencial" && !ciudad) {
      const err = generateErrorsUtils(
        "Se debe incluir una ciudad si el evento es presencial.",
        401
      );
      throw err;
    }

    const eventInfo = {
      nombre: nombre,
      tecnologia: tecnologia,
      online_presencial: online_presencial,
      ciudad: ciudad,
      rango_fechas: rango_fechas,
      tematica: tematica,
      organizador: organizador,
      descripcion: descripcion,
    };

    await createEventAdminService(eventInfo);

    res.send({
      status: "ok",
      message: "Evento creado correctamente.",
    });
  } catch (error) {
    next(error);
  }
};

export default createEventAdminController;
