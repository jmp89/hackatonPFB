import getPool from "../../database/getPool.js";

const insertEventResultsService = async (eventID, eventInfo) => {

    const pool = await getPool();

    for (let user of eventInfo){

        await pool.query(`
                UPDATE participates p
                JOIN users u ON u.id = p.user_id
                SET p.user_score = ?
                WHERE u.id = ? AND p.event_id = ?
            `, [ user.points, user.user_id, eventID ]);
    };
};

export default insertEventResultsService;