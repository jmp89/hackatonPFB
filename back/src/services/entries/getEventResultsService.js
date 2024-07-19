import getPool from '../../database/getPool.js';

const getEventResultsService = async () => {
    const pool = await getPool();

    const finishedEvents = await pool.query(`
        SELECT
        e.id AS event_id,
        e.name AS event_name,
        t.name AS technologies,
        th.name AS thematics,
        e.online_on_site,
        e.location,
        e.start_date,
        e.finish_date,
        e.start_time,
        e.finish_time,
        e.description AS event_description,
        e.organizer,
        e.image,
        u.name AS user_name,
        u.avatar AS user_avatar,
        p.user_score
        FROM events e
        LEFT JOIN participates p ON e.id = p.event_id
        LEFT JOIN users u ON p.user_id = u.id
        LEFT JOIN technologies_events te ON te.event_id = e.id
        LEFT JOIN technologies t ON t.id = te.technology_id
        LEFT JOIN thematics_events the ON the.event_id = e.id
        LEFT JOIN thematics th ON th.id = the.thematic_id
        WHERE e.finish_date < NOW()
        ORDER BY e.finish_date
    `);

    return finishedEvents[0];
};

export default getEventResultsService;
