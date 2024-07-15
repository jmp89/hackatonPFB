import Joi from 'joi';
import updateUserProfile from '../../services/users/updateUserProfile.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const updateUserProfileController = async (req, res, next) => {
    const userId = req.params.id;
    const { id: authUserId, role } = req.user;
    const { name, email, personal_info } = req.body;

    const loginUserControllerSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        personal_info: Joi.string(),
    });

    const { error } = loginUserControllerSchema.validate(req.body);
    try {
        if (error) {
            throw generateErrorsUtils(error.message, 400);
        }

        if (+userId !== +authUserId && role !== 'admin') {
            throw generateErrorsUtils(
                'No tienes permiso para modificar este perfil',
                403
            );
        }

        await updateUserProfile(userId, name, email, personal_info);
        res.status(200).send('Perfil actualizado con éxito');
    } catch (err) {
        next(err);
    }
};

export default updateUserProfileController;
