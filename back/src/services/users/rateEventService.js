import getPool from '../../database/getPool.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const rateEventService = async (rating, userId, eventId) => {
    const pool = await getPool();

    const [result] = await pool.query(
        `
            UPDATE participates
            SET rating_user_event = ?, rated = true
            WHERE user_id = ? AND event_id = ? AND rated = false
        `,
        [rating, userId, eventId]
    );

    if (result.affectedRows === 0) {
        throw generateErrorsUtils(
            'No has participado en este evento o ya lo has valorado',
            404
        );
    }
};

export default rateEventService;
