import getPool from '../../database/getPool.js';

const getEventThematicsService = async () => {
    const pool = await getPool();

    const thematics = await pool.query(`
        SELECT DISTINCT name
        FROM thematics
    `);

    return thematics;
};

export default getEventThematicsService;
