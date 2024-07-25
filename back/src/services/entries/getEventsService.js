import getPool from '../../database/getPool.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const getEventsService = async (filter, sort, direction) => {
    const pool = await getPool();

    let query = `
        SELECT e.id,
        e.name,
        t.name AS technologies,
        th.name AS thematics,
        e.online_on_site,
        e.location,
        e.organizer,
        e.start_date,
        e.finish_date,
        e.start_time,
        e.finish_time
        FROM events e
        LEFT JOIN technologies_events te ON te.event_id = e.id
        LEFT JOIN technologies t ON t.id = te.technology_id
        LEFT JOIN thematics_events the ON the.event_id = e.id
        LEFT JOIN thematics th ON th.id = the.thematic_id
    `;

    if (!filter) {
        query += `
            ORDER BY e.start_date ASC
        `;

        const [results] = await pool.query(query);

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
                    finish_time: row.finish_time,
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
    }

    if (filter) {
        query += `
            WHERE e.name LIKE ?
            OR t.name LIKE ?
            OR th.name LIKE ?
            OR e.online_on_site LIKE ?
            OR e.organizer LIKE ?
        `;
    }

    const validSort = [
        'name',
        'technology',
        'online_on_site',
        'organizer',
        'theme',
    ];

    const validDirection = ['ASC', 'DESC'];

    if (sort && !validSort.includes(sort)) {
        const err = generateErrorsUtils('Parámetros de búsqueda no válidos.');
        throw err;
    }

    if (sort) {
        if (direction && validDirection.includes(direction.toUpperCase())) {
            query += `
                ORDER BY ${sort} ${direction}
            `;
        } else {
            query += `
                ORDER BY ${sort} ASC
            `;
        }
    }

    const [results] = await pool.query(query, [
        `%${filter}%`,
        `%${filter}%`,
        `%${filter}%`,
        `%${filter}%`,
        `%${filter}%`,
    ]);

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
                finish_time: row.finish_time,
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
        technologies: Array.from(event.technologies.join(', ')),
        thematics: Array.from(event.thematics),
    }));

    return finalEventsList;
};

export default getEventsService;
