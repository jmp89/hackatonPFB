import getPool from '../../database/getPool.js';

const getEventThemesService = async () => {
    const pool = await getPool();

    const categories = await pool.query(`
        SELECT DISTINCT theme
        FROM events
    `);

    return categories;
};

export default getEventThemesService;
