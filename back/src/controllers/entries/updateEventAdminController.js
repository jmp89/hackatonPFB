import updateEventAdminService from '../../services/entries/updateEventAdminService.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';
import Joi from 'joi';

const updateEventAdminController = async (req, res, next) => {
    try {

        const technologySchema = Joi.object({
            name: Joi.string().required()
        });

        const thematicSchema = Joi.object({
            name: Joi.string().required()
        });

        const updateEventAdminSchema = Joi.object({
            name: Joi.string().required(),
            technologies: Joi.array().items(technologySchema).required(),
            online_on_site: Joi.string().required(),
            location: Joi.string().required(),
            start_date: Joi.date().required(),
            finish_date: Joi.date().required(),
            start_time: Joi.string().required(),
            finish_time: Joi.string().required(),
            thematics: Joi.array().items(thematicSchema).required(),
            organizer: Joi.number().integer().required(),
            description: Joi.string().min(15).max(255).required(),
        });

        const { error } = updateEventAdminSchema.validate(req.body);

        if (error) {
            throw generateErrorsUtils(error.message, 400);
        }

        const {
            name,
            technologies,
            thematics,
            online_on_site,
            location,
            start_date,
            finish_date,
            start_time,
            finish_time,
            organizer,
            description,
        } = req.body;

        if (online_on_site === 'on_site' && !location) {
            const err = generateErrorsUtils(
                'Se debe incluir una ciudad si el evento es presencial.',
                401
            );
            throw err;
        }

        const eventID = req.params.id;
        const eventInfo = {
            name: name,
            technologies: technologies,
            thematics: thematics,
            online_on_site: online_on_site,
            location: location,
            start_date: start_date,
            finish_date: finish_date,
            start_time: start_time,
            finish_time: finish_time,
            organizer: organizer,
            description: description,
        };

        await updateEventAdminService(eventID, eventInfo);

        let resData = {
            status: 'ok',
            message: 'Evento actualizado correctamente',
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

export default updateEventAdminController;
