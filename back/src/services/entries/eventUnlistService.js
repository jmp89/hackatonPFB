import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const eventUnlistService = async (id, eventID) => {

    const pool = await getPool();

    const eventRegister = await pool.query(`
            SELECT * FROM participates WHERE user_id = ? AND event_id = ?
        `, [ id, eventID ]);

    if (eventRegister[0].length < 1){
        const err = generateErrorsUtils("El usuario no se encuentra registrado en este evento.", 401);
        throw err;
    }

    await pool.query(`
            DELETE FROM participates WHERE user_id = ? AND event_id = ?
        `, [ id, eventID ]);
};

export default eventUnlistService;