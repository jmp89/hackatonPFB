import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const updateUserRegCodeService = async (registrationCode) => {
  const pool = await getPool();

  const [user] = await pool.query(
    `
            SELECT id FROM usuarios WHERE registrationCode=?
        `,
    [registrationCode]
  );

  if (!user.length)
    throw generateErrorsUtils("Codigo de registro incorrecto", 403);

  await pool.query(
    `
            UPDATE usuarios
            SET active=true, registrationCode=null
            WHERE registrationCode=?
        `,
    [registrationCode]
  );
};

export default updateUserRegCodeService;
