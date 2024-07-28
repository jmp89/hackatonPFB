import getPool from '../../database/getPool.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const updateUserProfileService = async (userId, name, surname, username, email, personalInfo) => {
    try {
        const pool = await getPool();

        let query = 'UPDATE users SET ';
        const values = [];

        if (name !== undefined && name !== '') {
            query += 'name = ?, ';
            values.push(name);
        }

        if (surname !== undefined && surname !== '') {
            query += 'surname = ?, ';
            values.push(surname);
        }

        if (username !== undefined && username !== '') {
            query += 'username = ?, ';
            values.push(username);
        }

        if (email !== undefined && email !== '') {
            query += 'email = ?, ';
            values.push(email);
        }

        if (personalInfo !== undefined && personalInfo !== '') {
            query += 'personal_info = ?, ';
            values.push(personalInfo);
        };

        if (values.length === 0) {
            throw generateErrorsUtils(
                'No hay campos válidos para actualizar',
                400
            );
        };

        query = query.slice(0, -2) + ' WHERE id = ?';
        values.push(userId);

        await pool.query(query, values);

        const [newUserInfo] = await pool.query(`
                SELECT
                    name,
                    surname,
                    username,
                    email,
                    role,
                    personal_info,
                    avatar,
                    active,
                    created_at,
                    modified_at
                FROM users
                WHERE id = ?
            `, [userId]);

        return newUserInfo;

    } catch (error) {

        throw generateErrorsUtils(
            `Error editando el perfil: ${error.message}`,
            400
        );
    };
};

export default updateUserProfileService;
