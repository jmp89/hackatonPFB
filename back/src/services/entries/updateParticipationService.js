import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const updateParticipationService = async (eventCode) => {
  const pool = await getPool();

  const [user] = await pool.query(
    `
            SELECT usuario_id FROM participa WHERE codigo_reserva=?
        `,
    [eventCode]
  );

  if (!user.length)
    throw generateErrorsUtils("Codigo de evento incorrecto", 403);

  await pool.query(
    `
            UPDATE participa
            SET active=true, codigo_reserva=null
            WHERE codigo_reserva=?
        `,
    [eventCode]
  );
};

export default updateParticipationService;
