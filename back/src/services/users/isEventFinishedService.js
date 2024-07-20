import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const isEventFinishedService = async (eventId) => {

    const pool = await getPool();
        
    const [[event]] = await pool.query(`
              SELECT id
              FROM events
              WHERE id = ? AND finish_date < NOW()
            `, [eventId]
    );
            
    if (!event) {
        throw generateErrorsUtils(
            'El evento no ha terminado o no existe',
            404
        );
    };
};

export default isEventFinishedService;