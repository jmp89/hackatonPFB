import getPool from "../../database/getPool.js";

const rateUserEvent = async (req, res) => {
  const { userId, eventId, rating } = req.body;


  if (rating < 1 || rating > 5) {
    return res.status(400).send("La valoración debe estar entre 1 y 5");
  }

  try {
    const pool = await getPool();


    const [[event]] = await pool.query(`
      SELECT id
      FROM events
      WHERE id = ? AND finish_date < NOW()
    `, [eventId]);

    if (!event) {
      return res.status(404).send("El evento no ha terminado o no existe");
    }


    const [result] = await pool.query(`
      UPDATE participates
      SET rating_user_event = ?
      WHERE user_id = ? AND event_id = ?
    `, [rating, userId, eventId]);


    if (result.affectedRows === 0) {
      return res.status(404).send("No has participado en este evento");
    }

    res.status(200).send("Valoración registrada correctamente");
  } catch (error) {
    console.error(error);
    res.status(500).send("Ha ocurrido un error al procesar la valoración");
  }
};

export default rateUserEvent;
