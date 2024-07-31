import Joi from 'joi';
import "dotenv/config";
import path from "path";
import fs from "fs";
import randomstring from 'randomstring';
import { createEventAdminService } from '../../services/entries/index.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const { UPLOADS_DIR } = process.env;

const createEventAdminController = async (req, res, next) => {
    try {

        const parsedBody = {
            ...req.body,
            technologies: JSON.parse(req.body.technologies),
            thematics: JSON.parse(req.body.thematics)
        };

        const createEventAdminSchema = Joi.object({
            name: Joi.string().required(),
            technologies: Joi.array().items(Joi.string()).required(),
            online_on_site: Joi.string().required(),
            location: Joi.string().required(),
            start_date: Joi.date().required(),
            finish_date: Joi.date().required(),
            start_time: Joi.string().required(),
            finish_time: Joi.string().required(),
            thematics: Joi.array().items(Joi.string()).required(),
            organizer: Joi.number().integer().required(),
            description: Joi.string().min(15).max(255).required(),
        });

        const { error } = createEventAdminSchema.validate(parsedBody);

        if (error) {
            throw generateErrorsUtils(error.message, 400);
        };

        if(!req.files || !req.files.fileName){
            throw generateErrorsUtils("Campo de imagen vacío", 400);
        };

        const eventInfo = req.body;
        const eventImage = req.files.fileName;

        const uploadDir = path.join(process.cwd(), UPLOADS_DIR);

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        };

        const randomName = randomstring.generate(15);
        const finalName = "/uploads/" + randomName + '_' + eventImage.name;

        const uploadPath = path.join(uploadDir, finalName);

        await createEventAdminService(eventInfo, finalName);

        await eventImage.mv(uploadPath);
        
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