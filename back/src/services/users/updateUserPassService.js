import bcrypt from "bcrypt";
import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import {selectUserByEmailService} from "./index.js";

const updateUserPassService = async (email, oldPassword, newPassword) => {
  const pool = await getPool();

  const user = await selectUserByEmailService(email);

  const passOk = await bcrypt.compare(oldPassword, user.password);

  if (!passOk) {

    throw generateErrorsUtils("Las contraseñas no coinciden", 409);
  }

  const hashPassword = await bcrypt.hash(newPassword, 10);

  await pool.query(
    `
            UPDATE users
            SET password=?
            WHERE email=?
        `,
    [hashPassword, email]
  );
};

export default updateUserPassService;
