import getPool from "../../database/getPool.js";

const insertUserAvatarService = async (avatar, userID) => {

    const pool = await getPool();

    await pool.query(`
            UPDATE users
            SET avatar = ?
            WHERE id = ?
        `, [ avatar, userID ]);

    const [[results]] = await pool.query(`
            SELECT avatar
            FROM users
            WHERE id = ?
        `, [userID]);

    return results;
};

export default insertUserAvatarService;