import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const updateUserRegCodeService = async (registrationCode) => {
  const pool = await getPool();

  const [user] = await pool.query(
    `
            SELECT id FROM users WHERE registration_code=?
        `,
    [registrationCode]
  );

  if (!user.length)
    throw generateErrorsUtils("Codigo de registro incorrecto", 403);

  await pool.query(
    `
            UPDATE users
            SET active=true, registration_code=null
            WHERE registration_code=?
        `,
    [registrationCode]
  );
};

export default updateUserRegCodeService;
