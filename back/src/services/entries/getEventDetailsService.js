import getPool from '../../database/getPool.js';

const getEventDetailsService = async (eventID) => {
    const pool = await getPool();

    const eventDetails = await pool.query(
        `
            SELECT
                e.name,
                th.name AS thematics,
                t.name AS technologies,
                e.online_on_site,
                e.location,
                e.organizer,
                e.start_date,
                e.finish_date,
                e.start_time,
                e.finish_time,
                COUNT(DISTINCT p.user_id) AS total_participants
            FROM events e
            LEFT JOIN participates p ON p.event_id = e.id
            LEFT JOIN technologies_events te ON te.event_id = e.id
            LEFT JOIN technologies t ON t.id = te.technology_id
            LEFT JOIN thematics_events the ON the.event_id = e.id
            LEFT JOIN thematics th ON th.id = the.thematic_id
            WHERE e.id = ?
            GROUP BY 
                e.name,
                th.name,
                t.name,
                e.online_on_site,
                e.location,
                e.organizer,
                e.start_date,
                e.finish_date,
                e.start_time,
                e.finish_time;
        `,
        [eventID]
    );

    return eventDetails[0];
};

export default getEventDetailsService;
