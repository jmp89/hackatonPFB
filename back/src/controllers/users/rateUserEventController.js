import Joi from 'joi';
import getPool from '../../database/getPool.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const rateUserEventController = async (req, res, next) => {
    const loginUserControllerSchema = Joi.object({
        userId: Joi.number().required(),
        eventId: Joi.number().required(),
        rating: Joi.number().required(),
    });

    try {
        const { userId, eventId, rating } = req.body;

        if (rating < 1 || rating > 5) {
            throw generateErrorsUtils(
                'La valoración debe estar entre 1 y 5',
                400
            );
        }

        const pool = await getPool();

        const [[event]] = await pool.query(
            `
      SELECT id
      FROM events
      WHERE id = ? AND finish_date < NOW()
    `,
            [eventId]
        );

        if (!event) {
            throw generateErrorsUtils(
                'El evento no ha terminado o no existe',
                404
            );
        }

        const [result] = await pool.query(
            `
      UPDATE participates
      SET rating_user_event = ?
      WHERE user_id = ? AND event_id = ?
    `,
            [rating, userId, eventId]
        );

        if (result.affectedRows === 0) {
            throw generateErrorsUtils('No has participado en este evento', 404);
        }

        res.status(200).send('Valoración registrada correctamente');
    } catch (error) {
        next(error);
    }
};

export default rateUserEventController;
