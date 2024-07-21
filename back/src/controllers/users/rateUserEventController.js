import Joi from 'joi';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';
import {
    isEventFinishedService,
    rateEventService
} from '../../services/users/index.js';

const rateUserEventController = async (req, res, next) => {
    const loginUserControllerSchema = Joi.object({
        eventId: Joi.number().required(),
        rating: Joi.number().required(),
    });

    try {
        const { eventId, rating } = req.body;
        const userId = req.user.id;

        if (rating < 1 || rating > 5) {
            throw generateErrorsUtils(
                'La valoración debe estar entre 1 y 5',
                400
            );
        };

        await isEventFinishedService(eventId);
                    
        await rateEventService(rating, userId, eventId);

        let resData = {
            status: "ok",
            message: "Valoración registrada correctamente",
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

export default rateUserEventController;
