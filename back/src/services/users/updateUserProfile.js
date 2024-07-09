import getPool from "../../database/getPool.js";

const updateUserProfile = async (userId, name, email, personalInfo) => {
    try {

        const pool = await getPool();
        const [results] = await pool.query(
            'UPDATE users SET name = ?, email = ?, personal_info = ? WHERE id = ?',
            [name, email, personalInfo, userId]
        );
        return results;
    } catch (error) {
        throw new Error(`Error updating user profile: ${error.message}`);
    }
};

export default updateUserProfile;
