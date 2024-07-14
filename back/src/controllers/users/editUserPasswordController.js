import { updateUserPassService } from '../../services/users/index.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';
import Joi from 'joi';

const editUserPasswordController = async (req, res, next) => {
    try {
        const Schema = Joi.object({
            email: Joi.string().email().required(),
            oldPassword: Joi.string().required(),
            newPassword: Joi.string().required(),
            repeatNewPassword: Joi.string()
                .required()
                .valid(Joi.ref('newPassword')),
        });

        const { error } = Schema.validate(req.body);

        if (error) {
            throw generateErrorsUtils(error.message, 400);
        }
        const { email, oldPassword, newPassword, repeatNewPassword } = req.body;

        await updateUserPassService(email, oldPassword, newPassword);

        res.send({
            status: 'ok',
            message: 'Contraseña actualizada',
        });
    } catch (error) {
        next(error);
    }
};

export default editUserPasswordController;
