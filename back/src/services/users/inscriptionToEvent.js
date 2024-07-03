import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const inscriptionToEvent = async (userId, eventId, eventCode) => {

    const pool = await getPool();

    const [[alreadyParticipating]] = await pool.query(`
        SELECT user_id, event_id
        FROM participates
        WHERE user_id = ? AND event_id = ?
      `, [ userId, eventId ])

      if (alreadyParticipating){

        throw generateErrorsUtils("El usuario ya está inscrito en este evento.", 401);
      }

    await pool.query(
      `
      INSERT INTO participates (user_id, event_id, reservation_code)
      VALUES (?, ?, ?)
      `,
      [userId, eventId, eventCode]
    );

};

export default inscriptionToEvent;
