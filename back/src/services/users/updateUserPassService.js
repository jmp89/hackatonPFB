import bcrypt from "bcrypt";
import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import selectUserByEmailService from "./selectUserByEmailService.js";

const updateUserPassService = async (email, recoverPassCode, newPassword) => {
  const pool = await getPool();

  const user = await selectUserByEmailService(email);

  if (!user || user.recoverPassCode !== recoverPassCode) {
    throw generateErrorsUtils("Email o codigo de recuperación incorrecto", 409);
  }

  const hashPassword = await bcrypt.hash(newPassword, 10);

  await pool.query(
    `
            UPDATE users
            SET password=?, recover_pass_code=null
            WHERE recover_pass_code=?
        `,
    [hashPassword, recoverPassCode]
  );
};

export default updateUserPassService;
