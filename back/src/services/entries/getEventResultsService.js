import getPool from '../../database/getPool.js';

const getEventResultsService = async () => {
    const pool = await getPool();

    // Obtener todos los eventos con tecnologías y temáticas
    const [results] = await pool.query(`
        SELECT
            e.id,
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
            us.username AS organizer_username,
            us.avatar AS organizer_avatar,
            e.image,
            AVG(p.rating_user_event) AS rating
        FROM events e
        LEFT JOIN technologies_events te ON te.event_id = e.id
        LEFT JOIN technologies t ON t.id = te.technology_id
        LEFT JOIN thematics_events the ON the.event_id = e.id
        LEFT JOIN thematics th ON th.id = the.thematic_id
        LEFT JOIN users us ON us.id = e.organizer
        LEFT JOIN participates p ON p.event_id = e.id
        WHERE e.finish_date < NOW()
        GROUP BY
            e.id,
            e.name,
            t.name,
            th.name,
            e.online_on_site,
            e.location,
            e.start_date,
            e.finish_date,
            e.start_time,
            e.finish_time,
            e.description,
            us.username,
            us.avatar,
            e.image
        ORDER BY e.finish_date
    `);

    const eventsMap = new Map();

    for (const row of results) {
        if (!eventsMap.has(row.id)) {
            eventsMap.set(row.id, {
                id: row.id,
                name: row.event_name,
                technologies: new Set(),
                thematics: new Set(),
                online_on_site: row.online_on_site,
                location: row.location,
                event_description: row.event_description,
                organizer: row.organizer_username,
                organizer_avatar: row.organizer_avatar,
                start_date: row.start_date,
                finish_date: row.finish_date,
                start_time: row.start_time,
                finish_time: row.finish_time,
                image: row.image,
                rating: row.rating,
                user_info: []
            });
        };

        const event = eventsMap.get(row.id);

        if (row.technologies) {
            event.technologies.add(row.technologies);
        };

        if (row.thematics) {
            event.thematics.add(row.thematics);
        };

        // Obtener usuarios ganadores solo si el evento aún no tiene usuarios
        if (event.user_info.length === 0) {
            const [usersScore] = await pool.query(`
                SELECT
                    user_id,
                    user_score,
                    u.username,
                    u.avatar
                FROM participates p
                JOIN users u ON u.id = p.user_id
                WHERE event_id = ?
            `, [row.id]);

            usersScore.forEach((user) => {
                event.user_info.push({
                    user_id: user.user_id,
                    user_score: user.user_score,
                    username: user.username,
                    avatar: user.avatar
                });
            });
        }
    };

    const finalEventsList = Array.from(eventsMap.values()).map(event => ({
        ...event,
        technologies: Array.from(event.technologies),
        thematics: Array.from(event.thematics)
    }));

    return finalEventsList;
};

export default getEventResultsService;