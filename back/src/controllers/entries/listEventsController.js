import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import getEventsService from "../../services/entries/getEventsService.js";

const listEventsController = async (req, res, next) => {

    try {
        
        const { filter, sort, direction } = req.query;

        const eventsList = await getEventsService(filter, sort, direction);

        if (eventsList.length < 1){
            
            const err = generateErrorsUtils("No se encontraron eventos", 404);
            throw err;
        };

        res.send({
            status: 'ok',
            data: {
                eventsList
            }
        });

    } catch (error) {

        next(error);
    };
};

export default listEventsController;