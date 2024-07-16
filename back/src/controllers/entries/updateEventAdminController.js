import updateEventAdminService from "../../services/entries/updateEventAdminService.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import Joi from "joi";

const updateEventAdminController = async (req, res, next) => {
  try {

    // TODO => joi para start_time y finish_time, location es NOT NULL ahora
    const updateEventAdminSchema = Joi.object({
      name: Joi.string().required(),
      technology: Joi.string().required(),
      online_on_site: Joi.string().required(),
      location: Joi.string().allow(null),
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
      location,
      start_date,
      finish_date,
      start_time,
      finish_time,
      category,
      organizer,
      description,
    } = req.body;

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
      location: location,
      start_date: start_date,
      finish_date: finish_date,
      start_time: start_time,
      finish_time: finish_time,
      category: category,
      organizer: organizer,
      description: description,
    };

    await updateEventAdminService(eventID, eventInfo);

    let resData = {
      status: "ok",
      message: "Evento actualizado correctamente"
    };

    let newToken = {};
  
    if (req.newAccessToken && req.newAccessToken.length > 1){
      newToken = {newAccessToken: req.newAccessToken};
      resData = {...resData, ...newToken};
    };
  
    res.send(resData);

  } catch (error) {
    next(error);
  }
};

export default updateEventAdminController;
