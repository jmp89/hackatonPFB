import getPool from '../../database/getPool.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const updateUserProfileService = async (userId, name, email, personalInfo) => {
    try {
        const pool = await getPool();

        let query = 'UPDATE users SET ';
        const values = [];

        if (name !== undefined && name !== '') {
            query += 'name = ?, ';
            values.push(name);
        }

        if (email !== undefined && email !== '') {
            query += 'email = ?, ';
            values.push(email);
        }

        if (personalInfo !== undefined && personalInfo !== '') {
            query += 'personal_info = ?, ';
            values.push(personalInfo);
        }

        if (values.length === 0) {
            throw generateErrorsUtils(
                'No hay campos válidos para actualizar',
                400
            );
        }

        query = query.slice(0, -2) + ' WHERE id = ?';
        values.push(userId);

        const [results] = await pool.query(query, values);
        return results;
    } catch (error) {
        throw generateErrorsUtils(
            `Error editando el perfil: ${error.message}`,
            400
        );
    }
};

export default updateUserProfileService;
