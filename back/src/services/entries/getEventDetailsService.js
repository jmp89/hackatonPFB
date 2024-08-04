import getPool from '../../database/getPool.js';

const getEventDetailsService = async (eventID) => {
    const pool = await getPool();

    const [results] = await pool.query(
        `
        SELECT
        e.id,
        e.name,
        GROUP_CONCAT(DISTINCT th.name ORDER BY th.name ASC) AS thematics,
        GROUP_CONCAT(DISTINCT t.name ORDER BY t.name ASC) AS technologies,
        e.online_on_site,
        e.location,
        u.name AS organizer_name,
        e.organizer,
        e.start_date,
        e.finish_date,
        e.start_time,
        e.finish_time,
        e.description,
        e.image,
        (SELECT p.user_score
        FROM participates p
        WHERE p.event_id = e.id ORDER BY p.user_score DESC LIMIT 1) AS user_score,
        (SELECT us.name
        FROM users us
        JOIN participates p ON us.id = p.user_id WHERE p.event_id = e.id ORDER BY p.user_score DESC LIMIT 1) AS top_user_name,
        AVG(p.rating_user_event) AS rating,
        COUNT(DISTINCT p.user_id) AS total_participants
      FROM events e
      LEFT JOIN participates p ON p.event_id = e.id
      LEFT JOIN technologies_events te ON te.event_id = e.id
      LEFT JOIN technologies t ON t.id = te.technology_id
      LEFT JOIN thematics_events the ON the.event_id = e.id
      LEFT JOIN thematics th ON th.id = the.thematic_id
      LEFT JOIN users u ON e.organizer = u.id
      WHERE e.id = ?
      GROUP BY
        e.id,
        e.online_on_site,
        e.location,
        e.organizer,
        e.start_date,
        e.finish_date,
        e.start_time,
        e.finish_time,
        e.description`,
        [eventID]
    );

    const eventsMap = new Map();

    for (const row of results) {
        if (!eventsMap.has(row.id)) {
            eventsMap.set(row.id, {
                id: row.id,
                name: row.name,
                technologies: new Set(),
                thematics: new Set(),
                online_on_site: row.online_on_site,
                location: row.location,
                organizer: row.organizer,
                organizer_name: row.organizer_name,
                start_date: row.start_date,
                finish_date: row.finish_date,
                start_time: row.start_time,
                finish_time: row.finish_time,
                description: row.description,
                rating: row.rating,
                user_score: row.user_score,
                top_user_name: row.top_user_name,
                image: row.image,
            });
        }

        const event = eventsMap.get(row.id);

        if (row.technologies) {
            event.technologies.add(row.technologies);
        }

        if (row.thematics) {
            event.thematics.add(row.thematics);
        }
    }

    const finalEventsList = Array.from(eventsMap.values()).map((event) => ({
        ...event,
        technologies: Array.from(event.technologies),
        thematics: Array.from(event.thematics),
    }));

    return finalEventsList;
};

export default getEventDetailsService;
