import bcrypt from 'bcrypt';
import getPool from '../../database/getPool.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';
import { selectUserByEmailService } from './index.js';

const resetPassService = async (email, recoverPassCode, newPassword) => {
    const pool = await getPool();

    try {
        const user = await selectUserByEmailService(email);
        console.log(user);
        if (!user || user.recover_pass_code !== recoverPassCode) {
            throw generateErrorsUtils(
                'Código de recuperación inválido o usuario no encontrado',
                400
            );
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);

        await pool.query(
            `
            UPDATE users
            SET password=?, recover_pass_code=NULL
            WHERE email=?
            `,
            [hashPassword, email]
        );
    } catch (error) {
        throw error;
    }
};

export default resetPassService;
