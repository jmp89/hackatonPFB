import { createEventAdminService } from '../../services/entries/index.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';
import Joi from 'joi';

const createEventAdminController = async (req, res, next) => {
    try {
        const createEventAdminSchema = Joi.object({
            name: Joi.string().required(),
            technology: Joi.string().required(),
            online_on_site: Joi.string().required(),
            location: Joi.string().required(),
            start_date: Joi.date().required(),
            finish_date: Joi.date().required(),
            start_time: Joi.string().required(),
            finish_time: Joi.string().required(),
            theme: Joi.string().required(),
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
            location,
            start_date,
            finish_date,
            start_time,
            finish_time,
            theme,
            organizer,
            description,
        } = req.body;

        if (online_on_site === 'on_site' && !city) {
            const err = generateErrorsUtils(
                'Se debe incluir una ciudad si el evento es presencial.',
                401
            );
            throw err;
        }

        const eventInfo = {
            name: name,
            technology: technology,
            online_on_site: online_on_site,
            location: location,
            start_date: start_date,
            finish_date: finish_date,
            start_time: start_time,
            finish_time: finish_time,
            theme: theme,
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
