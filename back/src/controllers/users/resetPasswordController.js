import Joi from 'joi';
import { resetPassService } from '../../services/users/index.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const resetPasswordController = async (req, res, next) => {
    try {
        const passwordRecoverySchema = Joi.object({
            email: Joi.string().email().required(),
            recoverPassCode: Joi.string().required(),
            newPassword: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{4,30}$'))
                .required(),
            repeatNewPassword: Joi.string()
                .required()
                .valid(Joi.ref('newPassword')),
        });

        const { email, recoverPassCode, newPassword, repeatNewPassword } =
            req.body;
        const { error } = passwordRecoverySchema.validate(req.body);

        if (error) {
            throw generateErrorsUtils(error.message, 400);
        };

        await resetPassService(email, recoverPassCode, newPassword);

        res.send({
            status: 'ok',
            message: 'Contraseña actualizada con éxito.',
        });
    } catch (error) {
        next(error);
    }
};

export default resetPasswordController;
