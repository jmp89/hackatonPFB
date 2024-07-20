import generateErrorsUtils from '../../utils/generateErrorsUtils.js';
import {getMyEventsListService} from '../../services/users/index.js';

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
        };

        if (userRole === 'admin' && req.query.userId) {
            queryUserId = req.query.userId;
        };

        const myEvents = await getMyEventsListService(queryUserId);

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