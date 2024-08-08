import Joi from 'joi';
import {
    insertEventResultsService,
    checkParticipationService,
} from '../../services/entries/index.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const insertEventResultsController = async (req, res, next) => {
    try {
        const { eventInfo } = req.body;

        const { eventID } = req.params;

        const itemsSchema = Joi.object({
            username: Joi.string().required(),
            user_id: Joi.number().required(),
            points: Joi.number().required()
        });

        const insertEventControllerSchema = Joi.object({
            eventInfo: Joi.array().items(itemsSchema).required()
        });

        const { error } = insertEventControllerSchema.validate(req.body);

        if (error) {
            throw generateErrorsUtils(error.message, 400);
        };
        console.log("pre check participation")
        await checkParticipationService(eventID, eventInfo);

        await insertEventResultsService(eventID, eventInfo);

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
