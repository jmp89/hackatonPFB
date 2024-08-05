import fs from 'fs';
import path from 'path';
import randomstring from 'randomstring';
import 'dotenv/config';

import generateErrorsUtils from '../../utils/generateErrorsUtils.js';
import { 
    insertUserAvatarService,
    previousAvatarOrImageService
} from '../../services/users/index.js';

const { UPLOADS_DIR } = process.env;

const uploadUserAvatarController = async (req, res, next) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            throw generateErrorsUtils('Faltan campos', 401);
        }

        const file = req.files.fileName;

        const uploadDir = path.join(process.cwd(), UPLOADS_DIR);

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const randomName = randomstring.generate(15);
        const finalName = "/uploads/" + randomName + '_' + file.name;

        const uploadPath = path.join(uploadDir, finalName);

        const userID = req.user.id;

        const previousAvatar = await previousAvatarOrImageService(userID, "avatar");

        if (previousAvatar || previousAvatar?.length > 0){
            const finalPath = UPLOADS_DIR + previousAvatar;
            fs.unlinkSync(finalPath);
        };

        const newAvatar = await insertUserAvatarService(finalName, userID);

        await file.mv(uploadPath);

        let resData = {
            status: "ok",
            message: "Archivo subido correctamente",
            data: {
                newAvatar
            }
        };

        let newToken = {};
        
        if (req.newAccessToken && req.newAccessToken.length > 1){
            newToken = {newAccessToken: req.newAccessToken};
            resData = {...resData, ...newToken};
        };
        
        res.send(resData);

    } catch (err) {
        next(err);
    }
};

export default uploadUserAvatarController;
