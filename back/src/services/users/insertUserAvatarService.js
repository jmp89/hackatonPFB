import getPool from "../../database/getPool.js";

const insertUserAvatarService = async (avatar, userID) => {

    const pool = await getPool();

    await pool.query(`
            UPDATE users
            SET avatar = ?
            WHERE id = ?
        `, [ avatar, userID ]);

};

export default insertUserAvatarService;