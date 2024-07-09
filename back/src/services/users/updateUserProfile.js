import getPool from "../../database/getPool.js";

const updateUserProfile = async (userId, personalInfo) => {
    try {
        const pool = await getPool();
        const [results] = await pool.query(
            'UPDATE users SET personal_info = ? WHERE id = ?',
            [personalInfo, userId]
        );
        return results;
    } catch (error) {
        throw new Error(`Error updating user profile: ${error.message}`);
    }
};

export default updateUserProfile;
