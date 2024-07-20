import getPool from "../../database/getPool.js";

const eventExistsService = async (eventID) => {

    const pool = await getPool();

    const [[eventExists]] = await pool.query(`
            SELECT id 
            FROM events 
            WHERE id = ?
        `,
        [eventID]
    );

    if (!eventExists) {
        throw generateErrorsUtils('No se ha encontrado el evento', 404);
    };
};

export default eventExistsService;