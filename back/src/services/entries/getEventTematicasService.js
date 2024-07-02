import getPool from "../../database/getPool.js";

const getEventTematicasService = async () => {

    const pool = await getPool();
    
    const tematicas = await pool.query(`
        SELECT DISTINCT tematica
        FROM eventos
    `);

    return tematicas;
};

export default getEventTematicasService;

