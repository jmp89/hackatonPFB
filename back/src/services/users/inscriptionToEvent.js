import getPool from "../../database/getPool.js";

const inscriptionToEvent = async (userId, eventId, eventCode) => {
  try {
    const pool = await getPool();
    const [code] = await pool.query(
      `
      INSERT INTO participa (usuario_id, evento_id, codigo_reserva)
      VALUES (?, ?, ?)
      `,
      [userId, eventId, eventCode]
    );
  } catch (error) {
    console.error("Error en inscriptionToEvent:", error);
    throw error;
  }
};

export default inscriptionToEvent;
