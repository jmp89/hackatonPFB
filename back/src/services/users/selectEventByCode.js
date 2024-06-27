import getPool from "../../database/getPool.js";

const selectEventByCode = async (codigo_reserva) => {
  try {
    const pool = await getPool();

    const [code] = await pool.query(
      `
      SELECT id, nombre, tematica, online_presencial, codigo_reserva
      FROM eventos
      WHERE codigo_reserva = ?
      `,
      [codigo_reserva]
    );

    return code && code.length > 0 ? code[0] : null;
  } catch (error) {
    console.error("Error en selectEventByCode:", error);
    throw error;
  }
};

export default selectEventByCode;
