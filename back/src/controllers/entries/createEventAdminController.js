import createEventAdminService from "../../services/entries/createEventAdminService.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const createEventAdminController = async (req, res, next) => {
  try {
    const {
      nombre,
      tecnologia,
      online_presencial,
      ciudad,
      rango_fechas,
      tematica,
      organizador,
      descripcion,
    } = req.body;

    if (
      !nombre ||
      !tecnologia ||
      !online_presencial ||
      !rango_fechas ||
      !tematica ||
      !descripcion
    ) {
      const err = generateErrorsUtils("Faltan campos por rellenar.", 401);
      throw err;
    }

    if (online_presencial === "presencial" && !ciudad) {
      const err = generateErrorsUtils(
        "Se debe incluir una ciudad si el evento es presencial.",
        401
      );
      throw err;
    }

    const eventInfo = {
      nombre: nombre,
      tecnologia: tecnologia,
      online_presencial: online_presencial,
      ciudad: ciudad,
      rango_fechas: rango_fechas,
      tematica: tematica,
      organizador: organizador,
      descripcion: descripcion,
    };

    await createEventAdminService(eventInfo);

    res.send({
      status: "ok",
      message: "Evento creado correctamente.",
    });
  } catch (error) {
    next(error);
  }
};

export default createEventAdminController;
