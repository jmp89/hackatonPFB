import generateErrorsUtils from '../../utils/generateErrorsUtils.js';
import { eventUnlistService } from '../../services/entries/index.js';
import Joi from 'joi';

const eventUnlistController = async (req, res, next) => {
    try {
        const { eventID } = req.params;
        const { id } = req.user;

        const eventUnlistControllerSchema = Joi.object({
            eventID: Joi.number().positive().integer().required(),
        });

        const { error } = eventUnlistControllerSchema.validate(req.body);

        if (error) {
            throw generateErrorsUtils(error.message, 400);
        };

        await eventUnlistService(id, eventID);

        let resData = {
            status: "ok",
            message: "Registro al evento cancelado correctamente.",
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

export default eventUnlistController;
