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

        const [myEvents] = await pool.query(`
            SELECT e.id,
            e.name,
            t.name AS technologies,
            th.name AS thematics,
            e.online_on_site,
            e.location,
            e.organizer,
            e.start_date,
            e.finish_date,
            e.start_time,
            e.finish_time
            FROM events e
            JOIN participates p ON e.id = p.event_id
            JOIN technologies_events te ON te.event_id = e.id
            JOIN technologies t ON t.id = te.technology_id
            JOIN thematics_events the ON the.event_id = e.id
            JOIN thematics th ON th.id = the.thematic_id
            WHERE p.user_id = ?
       `, [queryUserId]
        );
        
        let resData = {
            status: "ok",
            events: myEvents,
        };

        let newToken = {};
        
        if (req.newAccessToken && req.newAccessToken.length > 1){
            newToken = {newAccessToken: req.newAccessToken};
            resData = {...resData, ...newToken};
        };
        
        res.send(resData);

    } catch (error) {
        next(error);
    };
};

export default getMyEventsListController;