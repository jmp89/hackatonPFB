import Joi from 'joi';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';
import {updateUserProfileService} from '../../services/users/index.js';

const updateUserProfileController = async (req, res, next) => {
    const userId = req.user.id;
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
        };

        const newUserInfo = await updateUserProfileService(userId, name, email, personal_info);

        let resData = {
            status: "ok",
            message: "Perfil actualizado con éxito",
            data: {
                newUserInfo
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

export default updateUserProfileController;
