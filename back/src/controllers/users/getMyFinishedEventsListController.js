import generateErrorsUtils from '../../utils/generateErrorsUtils.js';
import { getMyFinishedEventsListService } from '../../services/users/index.js';

const getMyFinishedEventsListController = async (req, res, next) => {
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

        const finishedEvents = await getMyFinishedEventsListService(
            queryUserId
        );

        let resData = {
            status: 'ok',
            events: finishedEvents,
        };

        let newToken = {};

        if (req.newAccessToken && req.newAccessToken.length > 1) {
            newToken = { newAccessToken: req.newAccessToken };
            resData = { ...resData, ...newToken };
        }

        res.send(resData);
    } catch (error) {
        next(error);
    }
};

export default getMyFinishedEventsListController;
