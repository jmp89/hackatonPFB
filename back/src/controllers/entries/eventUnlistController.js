import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import {eventUnlistService} from "../../services/entries/index.js";

dotenv.config();

const { SECRET } = process.env;

const eventUnlistController = async (req, res, next) => {

    try {
        
        const { eventID } = req.body;

        if (!eventID) {
            const err = generateErrorsUtils("Es necesario el ID del evento.", 401);
            throw err;
        };

        const token = req.headers["authorization"];

        if (!token) {
            const err = generateErrorsUtils("Inicie sesión para realizar esta operación.", 403);
            throw err;
        };

        const { id } = jwt.verify(token, SECRET);

        await eventUnlistService(id, eventID);

        res.send({
            status: "ok",
            message: "Registro al evento cancelado correctamente."
        });

    } catch (error) {
      
        next(error);
    };
};

export default eventUnlistController;