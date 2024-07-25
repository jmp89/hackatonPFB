import Randomstring from 'randomstring';
import Joi from 'joi';
import {
    inscriptionToEventService,
    eventExistsService,
    sendEventRegistrationMailService,
} from '../../services/entries/index.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const eventRegistrationController = async (req, res, next) => {
    try {
        const eventRegistrationControllerSchema = Joi.object({
            eventID: Joi.number().positive().integer().required(),
        });
        const { eventID } = req.params;
        const id = req.user.id;

        const { error } = eventRegistrationControllerSchema.validate(
            req.params
        );

        if (error) {
            throw generateErrorsUtils(error.message, 400);
        }

        await eventExistsService(eventID);

        const eventCode = Randomstring.generate(10);

        await inscriptionToEventService(id, eventID, eventCode);

        await sendEventRegistrationMailService(eventID, id, eventCode);

        let resData = {
            status: 'ok',
            message: 'Se ha enviado un email para confirmar la inscripción',
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

export default eventRegistrationController;
