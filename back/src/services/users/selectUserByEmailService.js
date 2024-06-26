import getPool from "../../database/getPool.js";

const selectUserByEmailService = async (email) => {
  try {
    const pool = await getPool();

    const [user] = await pool.query(
      `
      SELECT id, nombre, email, contraseña, es_admin
      FROM usuarios
      WHERE email = ?
      `,
      [email]
    );

    return user && user.length > 0 ? user[0] : null;
  } catch (error) {
    console.error("Error en selectUserByEmailService:", error);
    throw error;
  }
};

export default selectUserByEmailService;
