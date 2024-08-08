import { getParticipantsService } from "../../services/entries/index.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const getParticipantsController = async (req, res, next) => {

    try {
        
        const { eventID } = req.params;

        const participants = await getParticipantsService(eventID);

        let resData = {
            status: 'ok',
            participants: participants,
        };

        let newToken = {};

        if (req.newAccessToken && req.newAccessToken.length > 1) {
            newToken = { newAccessToken: req.newAccessToken };
            resData = { ...resData, ...newToken };
        }

        res.send(resData);

    } catch (error) {
        
        next(error);

    };

};

export default getParticipantsController;