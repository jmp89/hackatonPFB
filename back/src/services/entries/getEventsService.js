import getPool from '../../database/getPool.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const getEventsService = async (filter, sort, direction) => {
    const pool = await getPool();

    let query = `
        SELECT e.id,
        e.name,
        e.technology,
        e.online_on_site,
        e.location,
        e.organizer,
        e.theme,
        e.start_date,
        e.finish_date,
        e.start_time,
        e.finish_time
        FROM events e
    `;

    if (!filter) {
        query += `
            ORDER BY e.start_date ASC
        `;

        const eventsList = await pool.query(query);

        return eventsList[0];
    }

    if (filter) {
        query += `
            WHERE e.name LIKE ?
            OR e.technology LIKE ?
            OR e.online_on_site LIKE ?
            OR e.organizer LIKE ?
            OR e.theme LIKE ?
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

    const eventsList = await pool.query(query, [
        `%${filter}%`,
        `%${filter}%`,
        `%${filter}%`,
        `%${filter}%`,
        `%${filter}%`,
    ]);

    return eventsList[0];
};

export default getEventsService;
