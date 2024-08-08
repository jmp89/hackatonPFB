import getPool from "../../database/getPool.js";

const getParticipantsService = async (eventID) => {

    const pool = await getPool();

    const [results] = await pool.query(`
            SELECT u.id, u.username, u.avatar, e.name
            FROM users u
            JOIN participates p ON p.user_id = u.id
            JOIN events e ON p.event_id = e.id
            WHERE p.event_id = ?
        `, [ eventID ]);

    return results;
};

export default getParticipantsService;