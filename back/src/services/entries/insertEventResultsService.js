import getPool from "../../database/getPool.js";
import {checkParticipationService} from "./index.js";

const insertEventResultsService = async (eventInfo) => {

    const pool = await getPool();

    await pool.query(`
                UPDATE participates p
                JOIN users u ON u.id = p.user_id
                SET p.user_score = ?
                WHERE u.name = ? AND p.event_id = ?
            `, [
                eventInfo.points1,
                eventInfo.user1,
                eventInfo.eventID
            ]);

    await pool.query(`
                UPDATE participates p
                JOIN users u ON u.id = p.user_id
                SET p.user_score = ?
                WHERE u.name = ? AND p.event_id = ?
            `, [
                eventInfo.points2,
                eventInfo.user2,
                eventInfo.eventID
            ]);

    await pool.query(`
                UPDATE participates p
                JOIN users u ON u.id = p.user_id
                SET p.user_score = ?
                WHERE u.name = ? AND p.event_id = ?
            `, [
                eventInfo.points3,
                eventInfo.user3,
                eventInfo.eventID
            ]);


    await pool.query(`
                UPDATE participates p
                JOIN users u ON u.id = p.user_id
                SET p.user_score = ?
                WHERE u.name = ? AND p.event_id = ?
            `, [
                eventInfo.points4,
                eventInfo.user4,
                eventInfo.eventID
            ]);

    await pool.query(`
                UPDATE participates p
                JOIN users u ON u.id = p.user_id
                SET p.user_score = ?
                WHERE u.name = ? AND p.event_id = ?
            `, [
                eventInfo.points5,
                eventInfo.user5,
                eventInfo.eventID
            ]);
};

export default insertEventResultsService;