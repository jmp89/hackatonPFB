import {getEventResultsService} from "../../services/entries/index.js";


const listEventResultsController = async (req, res, next) => {

    try {

        const finishedEvents = await getEventResultsService();

        res.send({
            status: 'ok',
            data: {
                finishedEvents
            }
        });

    } catch (error) {
        
        next(error);
    };
};

export default listEventResultsController;