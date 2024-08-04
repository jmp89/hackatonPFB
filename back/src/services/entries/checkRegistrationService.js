import getPool from '../../database/getPool.js';

const checkRegistrationService = async (userID, eventID) => {
    const pool = await getPool();

    const [result] = await pool.query(
        `
        SELECT * FROM participates WHERE user_id = ? AND event_id = ?
    `,
        [userID, eventID]
    );

    return result.length > 0;
};

export default checkRegistrationService;
