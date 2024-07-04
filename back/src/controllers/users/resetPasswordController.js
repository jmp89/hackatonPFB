import getPool from '../../database/getPool.js';
import updateUserPassService from '../../services/users/updateUserPassService.js';
import Joi from 'joi';

const resetPasswordController = async (req, res, next) => {
    try {
        const passwordRecoverySchema = Joi.object({
            email: Joi.string().email().required(),
            recoverPassCode: Joi.string().required(),
            newPassword: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$'))
                .required(),
        });

        const { email, recoverPassCode, newPassword } = req.body;
        const { error } = passwordRecoverySchema.validate(req.body);

        if (error) {
            return res.status(400).send(error.message);
        }

        const pool = await getPool();

        await updateUserPassService(email, recoverPassCode, newPassword);

        await pool.query(
            `
            UPDATE users
            SET recover_pass_code=NULL
            WHERE email=?
            `,
            [email]
        );

        res.send({
            status: 'ok',
            message: 'Contraseña actualizada con éxito.',
        });
    } catch (error) {
        next(error);
    }
};

export default resetPasswordController;
