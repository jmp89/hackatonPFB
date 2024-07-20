import Joi from 'joi';
import {
    insertEventResultsService,
    checkParticipationService,
} from '../../services/entries/index.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const insertEventResultsController = async (req, res, next) => {
    try {
        const { eventInfo } = req.body;

        const insertEventControllerSchema = Joi.object({
            eventInfo: Joi.object({
                eventID: Joi.number().required(),
            })
                .pattern(/^user\d+$/, Joi.string().required())
                .pattern(/^points\d+$/, Joi.number().required()),
        });

        const { error } = insertEventControllerSchema.validate(req.body);

        if (error) {
            throw generateErrorsUtils(error.message, 400);
        };

        await checkParticipationService(eventInfo);

        await insertEventResultsService(eventInfo);

        let resData = {
            status: "ok",
            message: "Puntuaciones insertadas correctamente.",
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

export default insertEventResultsController;
