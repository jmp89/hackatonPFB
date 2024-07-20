import Randomstring from 'randomstring';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import Joi from 'joi';
import {
    inscriptionToEventService,
    eventExistsService,
    sendEventRegistrationMailService
} from '../../services/entries/index.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const { SECRET } = process.env;

const eventRegistrationController = async (req, res, next) => {
    try {

        const eventCode = Randomstring.generate(10);
        const { eventID } = req.body;
        const auth = req.headers['authorization'];
        const cleanToken = jwt.verify(auth, SECRET);
        const { id, role } = cleanToken;
        const eventRegistrationControllerSchema = Joi.object({
            eventID: Joi.number().positive().integer().required(),
        });

        const { error } = eventRegistrationControllerSchema.validate(req.body);

        if (error) {
            throw generateErrorsUtils(error.message, 400);
        }

        await eventExistsService(eventID);

        await inscriptionToEventService(id, eventID, eventCode);

        await sendEventRegistrationMailService(eventID, id, eventCode);

        let resData = {
            status: "ok",
            message: "Se ha enviado un email para confirmar la inscripción",
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

export default eventRegistrationController;
