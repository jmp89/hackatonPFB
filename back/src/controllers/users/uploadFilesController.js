import fs from 'fs';
import path from 'path';
import randomstring from "randomstring";
import "dotenv/config";

import generateErrorsUtils from '../../utils/generateErrorsUtils.js';
import {insertUserAvatarService} from '../../services/users/index.js';

const { UPLOADS_DIR } = process.env;

const uploadFilesController = async (req, res, next) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            throw generateErrorsUtils("Faltan campos", 401);
        }

        const file = req.files.fileName;

        // Directorio de destino donde guardar los archivos subidos (back/uploads)
        // sin /public no funciona, pero no debería incluirlo
        const uploadDir = path.join(process.cwd(), UPLOADS_DIR);

        // Verificar si la carpeta de destino existe, si no, crearla
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const randomName = randomstring.generate(15);        
        const finalName = randomName + "_" + file.name;
        // Ruta completa del archivo de destino dentro de back/uploads
        const uploadPath = path.join(uploadDir, finalName);

        const userID = req.user.id;
        
        await insertUserAvatarService(finalName, userID);
        
        // Mover el archivo a la carpeta de destino
        await file.mv(uploadPath);
        
        res.send({
            status: 'ok',
            message: 'Archivo subido correctamente'
        });

    } catch (err) {

        next(err);
    }
};

export default uploadFilesController;
