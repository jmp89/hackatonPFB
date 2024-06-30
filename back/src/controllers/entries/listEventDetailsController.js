import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import getEventDetailsService from "../../services/entries/getEventDetailsService.js";

const listEventDetailsController = async (req, res, next) => {

    try {
        
        const { eventID } = req.params;

        const eventDetails = await getEventDetailsService(eventID);

        if (eventDetails.length < 1 || eventDetails[0].nombre === null){

            const err = generateErrorsUtils("No se encontró el evento", 404);
            throw err;
        };

        res.send({
            status: 'ok',
            data: {
                eventDetails
            }
        });

    } catch (error) {
        
        next(error);
    };
};

export default listEventDetailsController;