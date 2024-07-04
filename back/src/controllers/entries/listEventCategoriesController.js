import getEventCategoriesService from '../../services/entries/getEventCategoriesService.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';

const listEventCategoriesController = async (req, res, next) => {
    try {
        const categories = await getEventCategoriesService();

        if (!categories) {
            const err = generateErrorsUtils(
                'No se encontraron tematicas.',
                404
            );
            throw err;
        }
        const [rows, columns] = categories;

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

export default listEventCategoriesController;
