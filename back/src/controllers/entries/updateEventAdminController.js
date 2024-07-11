import updateEventAdminService from "../../services/entries/updateEventAdminService.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import Joi from "joi";

const updateEventAdminController = async (req, res, next) => {
  try {

    
    const updateEventAdminSchema = Joi.object({
      name: Joi.string().required(),
      technology: Joi.string().required(),
      online_on_site: Joi.string().required(),
      city: Joi.string().allow(null),
      start_date: Joi.date().required(),
      finish_date: Joi.date().required(),
      category: Joi.string().required(),
      organizer: Joi.number().integer().required(),
      description: Joi.string().min(15).max(255).required(),
    });

    const { error } = updateEventAdminSchema.validate(req.body);

    if (error) {
      throw generateErrorsUtils(error.message, 400);
    }

    const {
      name,
      technology,
      online_on_site,
      city,
      start_date,
      finish_date,
      category,
      organizer,
      description,
    } = req.body;

    if (
      !name ||
      !technology ||
      !online_on_site ||
      !start_date ||
      !finish_date ||
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

    const eventID = req.params.id;
    const eventInfo = {
      name: name,
      technology: technology,
      online_on_site: online_on_site,
      city: city,
      start_date: start_date,
      finish_date: finish_date,
      category: category,
      organizer: organizer,
      description: description,
    };

    await updateEventAdminService(eventID, eventInfo);

    res.send({
      status: "ok",
      message: "Evento actualizado correctamente."
    });

  } catch (error) {
    next(error);
  }
};

export default updateEventAdminController;
