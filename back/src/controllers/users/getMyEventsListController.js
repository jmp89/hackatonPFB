import getPool from '../../database/getPool.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const getMyEventsListController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const userRole = req.user.role;
        let queryUserId = userId;

        if (userRole !== 'admin' && req.query.userId) {
            throw generateErrorsUtils(
                'No tienes permiso para ver los eventos de otros usuarios',
                403
            );
        }

        if (userRole === 'admin' && req.query.userId) {
            queryUserId = req.query.userId;
        }

        const pool = await getPool();

        const [myEvents] = await pool.query(
            `SELECT e.* 
       FROM events e
       JOIN participates p ON e.id = p.event_id
       WHERE p.user_id = ?`,
            [queryUserId]
        );

        res.send({
            status: 'ok',
            events: myEvents,
        });
    } catch (error) {
        next(error);
    }
};

export default getMyEventsListController;
