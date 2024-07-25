import getPool from '../../database/getPool.js';

const getEventDetailsService = async (eventID) => {
    const pool = await getPool();

    const [results] = await pool.query(
        `
            SELECT
                e.id,
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
                e.id,
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
                start_date: row.start_date,
                finish_date: row.finish_date,
                start_time: row.start_time,
                finish_time: row.finish_time
            });
        };
        
        const event = eventsMap.get(row.id);

        if (row.technologies) {
            event.technologies.add(row.technologies);
        };

        if (row.thematics) {

            event.thematics.add(row.thematics);
        };
    };

    const finalEventsList = Array.from(eventsMap.values()).map(event => ({
        ...event,
        technologies: Array.from(event.technologies),
        thematics: Array.from(event.thematics)
    }));

    return finalEventsList;
};

export default getEventDetailsService;
