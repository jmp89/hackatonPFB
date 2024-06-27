import getPool from "../../database/getPool.js";

const selectUserByEmailService = async (email) => {
  const pool = await getPool();

  const [user] = await pool.query(
    `
      SELECT id, contraseña, email, role, recoverPassCode, active
      FROM usuarios
      WHERE email = ?
      `,
    [email]
  );

  return user[0];
};

export default selectUserByEmailService;
