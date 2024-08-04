import { checkRegistrationService } from '../../services/entries/index.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const checkRegistrationController = async (req, res, next) => {
    try {
        const { eventID } = req.params;
        const { id } = req.user;

        if (!eventID) {
            throw generateErrorsUtils('El ID del evento es obligatorio.', 400);
        }

        const isRegistered = await checkRegistrationService(id, eventID);

        res.send({ isRegistered });
    } catch (error) {
        next(error);
    }
};

export default checkRegistrationController;
