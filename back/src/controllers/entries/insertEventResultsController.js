import {
    insertEventResultsService,
    checkParticipationService
} from "../../services/entries/index.js"


const insertEventResultsController = async (req, res, next) => {

    try {
        
        const { eventInfo } = req.body;

        await checkParticipationService(eventInfo);

        await insertEventResultsService(eventInfo);

        res.send({
            status: 'ok',
            message: 'Puntuaciones insertadas correctamente.'
        });

    } catch (error) {

        next(error);  
    };
};

export default insertEventResultsController;