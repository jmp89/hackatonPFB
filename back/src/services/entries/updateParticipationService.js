import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const updateParticipationService = async (eventCode) => {
  const pool = await getPool();

  const [user] = await pool.query(
        `
            SELECT user_id FROM participates WHERE reservation_code=?
        `,
    [eventCode]
  );

  if (!user.length)
    throw generateErrorsUtils("Codigo de evento incorrecto", 403);

  await pool.query(
        `
            UPDATE participates
            SET active=true, reservation_code=null
            WHERE reservation_code=?
        `,
    [eventCode]
  );
};

export default updateParticipationService;
