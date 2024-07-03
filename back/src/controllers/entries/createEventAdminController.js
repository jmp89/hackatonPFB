import createEventAdminService from "../../services/entries/createEventAdminService.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import Joi from "joi";
const createEventAdminController = async (req, res, next) => {
  try {
    const createEventAdminSchema = Joi.object({
      name: Joi.string().required(),
      technology: Joi.string().required(),
      online_on_site: Joi.string().required(),
      city: Joi.string().allow(null),
      date_range: Joi.date().required(),
      category: Joi.string().required(),
      organizer: Joi.number().integer().required(),
      description: Joi.string().min(15).max(255).required(),
    });

    const { error } = createEventAdminSchema.validate(req.body);

    if (error) {
      throw generateErrorsUtils(error.message, 400);
    }
    const {
      name,
      technology,
      online_on_site,
      city,
      date_range,
      category,
      organizer,
      description,
    } = req.body;

    if (
      !name ||
      !technology ||
      !online_on_site ||
      !date_range ||
      !category ||
      !description
    ) {
      const err = generateErrorsUtils("Faltan campos por rellenar.", 401);
      throw err;
    }

    if (online_on_site === "on_site" && !city) {
      const err = generateErrorsUtils(
        "Se debe incluir una ciudad si el evento es presencial.",
        401
      );
      throw err;
    }

    const eventInfo = {
      name: name,
      technology: technology,
      online_on_site: online_on_site,
      city: city,
      date_range: date_range,
      category: category,
      organizer: organizer,
      description: description,
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
