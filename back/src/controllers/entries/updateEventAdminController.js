import "dotenv/config";
import path from "path";
import fs from "fs";
import randomstring from 'randomstring';
import updateEventAdminService from '../../services/entries/updateEventAdminService.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';
import Joi from 'joi';

const { UPLOADS_DIR } = process.env;

const updateEventAdminController = async (req, res, next) => {
    try {

        const parsedBody = {
            ...req.body,
            technologies: JSON.parse(req.body.technologies),
            thematics: JSON.parse(req.body.thematics)
        }

        if(parsedBody.fileName){

            delete parsedBody["fileName"];
        };


        const updateEventAdminSchema = Joi.object({
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

        const { error } = updateEventAdminSchema.validate(parsedBody);

        if (error) {
            throw generateErrorsUtils(error.message, 400);
        };

        const eventInfo = req.body;
        const eventID = req.params.id;

        let finalName;

        if (req.files || req.files.fileName){
            console.log("por aki ando ppepepepepepepe")
            const eventImage = req.files.fileName;

            const uploadDir = path.join(process.cwd(), UPLOADS_DIR);

            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            };

            const randomName = randomstring.generate(15);
            finalName = "/uploads/" + randomName + '_' + eventImage.name;

            const uploadPath = path.join(uploadDir, finalName);

            await eventImage.mv(uploadPath);
        };

        await updateEventAdminService(eventID, eventInfo, finalName);

        let resData = {
            status: 'ok',
            message: 'Evento actualizado correctamente',
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

export default updateEventAdminController;
