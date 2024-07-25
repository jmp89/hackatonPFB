import { updateUserRegCodeService } from '../../services/users/index.js';
import Joi from 'joi';
const validateUserController = async (req, res, next) => {
    try {
        const validateUserControllerSchema = Joi.object({
            registrationCode: Joi.string().required(),
        });

        const { error } = validateUserControllerSchema.validate(req.params);

        const { registrationCode } = req.params;

        if (error) {
            throw generateErrorsUtils(error.message, 400);
        }

        await updateUserRegCodeService(registrationCode);

        res.send({
            status: 'ok',
            message: 'Usuario activado correctamente',
        });
    } catch (error) {
        next(error);
    }
};

export default validateUserController;
