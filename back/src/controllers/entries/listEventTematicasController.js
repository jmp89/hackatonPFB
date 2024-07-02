import getEventTematicasService from "../../services/entries/getEventTematicasService.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const listEventTematicasController = async (req, res, next) => {

    try {

        const tematicas = await getEventTematicasService();

        if (!tematicas) {

            const err = generateErrorsUtils("No se encontraron tematicas.", 404);
            throw err;
        };
        const [rows, columns] = tematicas;

        res.send({
            status: "ok",
            data: {
                rows
            }
        });
    } catch (error) {

        next(error);
    };
};

export default listEventTematicasController;
