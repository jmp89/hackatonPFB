import { updateUserPassService } from '../../services/users/index.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';
import Joi from 'joi';

const editUserPasswordController = async (req, res, next) => {
    try {
        const Schema = Joi.object({
            email: Joi.string().email().required(),
            oldPassword: Joi.string().required(),
            newPassword: Joi.string().required(),
        });

        const { error } = Schema.validate(req.body);

        if (error) {
            throw generateErrorsUtils(error.message, 400);
        }
        const { email, oldPassword, newPassword } = req.body;

        await updateUserPassService(email, oldPassword, newPassword);

        let resData = {
            status: "ok",
            message: "Contraseña actualizada",
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

export default editUserPasswordController;
