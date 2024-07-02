import getPool from "../../database/getPool.js";

const inscriptionToEvent = async (userId, eventId, eventCode) => {
  try {
    const pool = await getPool();
    const [code] = await pool.query(
      `
      INSERT INTO participates (user_id, event_id, reservation_code)
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
