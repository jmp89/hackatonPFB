import getPool from "../../database/getPool.js";

const insertRecoveryPassCodeService = async (recoveryCode, email) => {

    const pool = await getPool();

    await pool.query(
        `
        UPDATE users
        SET recover_pass_code=?
        WHERE email=?
        `,
        [recoveryCode, email]
      );
};

export default insertRecoveryPassCodeService;