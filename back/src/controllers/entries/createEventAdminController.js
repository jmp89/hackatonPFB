import { createEventAdminService } from '../../services/entries/index.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';
import Joi from 'joi';

const createEventAdminController = async (req, res, next) => {
    try {
        const createEventAdminSchema = Joi.object({
            name: Joi.string().required(),
            //TODO => technologies: Joi.string().required(),
            online_on_site: Joi.string().required(),
            location: Joi.string().required(),
            start_date: Joi.date().required(),
            finish_date: Joi.date().required(),
            start_time: Joi.string().required(),
            finish_time: Joi.string().required(),
            //TODO  => thematics: Joi.string().required(),
            organizer: Joi.number().integer().required(),
            description: Joi.string().min(15).max(255).required(),
        });

        const { error } = createEventAdminSchema.validate(req.body);

        if (error) {
            throw generateErrorsUtils(error.message, 400);
        }
        const {
            name,
            technologies,
            online_on_site,
            location,
            start_date,
            finish_date,
            start_time,
            finish_time,
            thematics,
            organizer,
            description,
        } = req.body;

        const eventInfo = {
            name: name,
            technologies: technologies,
            online_on_site: online_on_site,
            location: location,
            start_date: start_date,
            finish_date: finish_date,
            start_time: start_time,
            finish_time: finish_time,
            thematics: thematics,
            organizer: organizer,
            description: description,
        };

        await createEventAdminService(eventInfo);

        let resData = {
            status: 'ok',
            message: 'Evento creado correctamente',
        };

        let newToken = {};

        if (req.newAccessToken && req.newAccessToken.length > 1) {
            newToken = { newAccessToken: req.newAccessToken };
            resData = { ...resData, ...newToken };
        }

        res.send(resData);
    } catch (error) {
        next(error);
    }
};

export default createEventAdminController;
