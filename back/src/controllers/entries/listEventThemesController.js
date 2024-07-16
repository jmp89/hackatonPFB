import { getEventThemesService } from '../../services/entries/index.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const listEventThemesController = async (req, res, next) => {
    try {
        const themes = await getEventThemesService();

        if (!themes) {
            const err = generateErrorsUtils(
                'No se encontraron tematicas.',
                404
            );
            throw err;
        }
        const [rows, columns] = themes;

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

export default listEventThemesController;
