import getPool from "../../database/getPool.js";

const getEventCategoriesService = async () => {

    const pool = await getPool();
    
    const categories = await pool.query(`
        SELECT DISTINCT category
        FROM events
    `);

    return categories;
};

export default getEventCategoriesService;

