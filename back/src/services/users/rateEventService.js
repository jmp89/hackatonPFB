import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const rateEventService = async (rating, userId, eventId) => {

    const pool = await getPool();

    const [result] = await pool.query(
        `
            UPDATE participates
            SET rating_user_event = ?
            WHERE user_id = ? AND event_id = ?
        `, [rating, userId, eventId]
    );

    if (result.affectedRows === 0) {
        throw generateErrorsUtils('No has participado en este evento', 404);
    };

};

export default rateEventService;