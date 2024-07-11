import updateUserProfile from '../../services/users/updateUserProfile.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const updateUserProfileController = async (req, res, next) => {
    const userId = req.params.id;
    const { id: authUserId, role } = req.user;
    const { name, email, personal_info } = req.body;

    try {
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
export default updateUserProfileController;
