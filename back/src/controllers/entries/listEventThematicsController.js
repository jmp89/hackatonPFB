import { getEventThematicsService } from '../../services/entries/index.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const listEventThematicsController = async (req, res, next) => {
    try {
        const thematics = await getEventThematicsService();

        if (!thematics) {
            const err = generateErrorsUtils(
                'No se encontraron temáticas.',
                404
            );
            throw err;
        }
        const [rows, columns] = thematics;

        res.send({
            status: 'ok',
            data: {
                rows,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default listEventThematicsController;
