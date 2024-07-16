import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import generateErrorsUtils from '../../utils/generateErrorsUtils.js';
import { eventUnlistService } from '../../services/entries/index.js';
import Joi from 'joi';

dotenv.config();

const { SECRET } = process.env;

const eventUnlistController = async (req, res, next) => {
    try {
        const { eventID } = req.body;

        const eventUnlistControllerSchema = Joi.object({
            eventID: Joi.number().positive().integer().required(),
        });

        const { error } = eventUnlistControllerSchema.validate(req.body);

        if (error) {
            throw generateErrorsUtils(error.message, 400);
        }

        if (!eventID) {
            const err = generateErrorsUtils(
                'Es necesario el ID del evento.',
                401
            );
            throw err;
        }

        const token = req.headers['authorization'];

        if (!token) {
            const err = generateErrorsUtils(
                'Inicie sesión para realizar esta operación.',
                403
            );
            throw err;
        }

        const { id } = jwt.verify(token, SECRET);

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
