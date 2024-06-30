import inscriptionToEvent from "../../services/users/inscriptionToEvent.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import sendMailUtils from "../../utils/sendMailUtils.js";
import Randomstring from "randomstring";
import jwt from "jsonwebtoken";
import "dotenv/config";
import getPool from "../../database/getPool.js";

const { SECRET } = process.env;

const eventRegistrationController = async (req, res, next) => {
  try {
    const eventCode = Randomstring.generate(10);
    const { eventID } = req.body;
    const auth = req.headers["authorization"];
    const cleanToken = jwt.verify(auth, SECRET);
    const { id, role } = cleanToken;
    if (!role) {
      throw generateErrorsUtils("Debes iniciar sesión", 403);
    }
    inscriptionToEvent(id, eventID, eventCode);

    const pool = await getPool();

    const [[eventInfo]] = await pool.query(
      `
        SELECT nombre, descripcion
        FROM eventos
        WHERE id = ?
      `,
      [eventID]
    );

    console.log("/////////////////////");
    console.log(eventInfo.nombre);

    const [email] = await pool.query(
      `
      SELECT email
      FROM usuarios
      WHERE id = ?
      `,
      [id]
    );
    const finalEmail = email[0].email;

    const emailSubject = `Confirma tu inscripción en ${eventInfo.nombre}`;

    const emailBody = `
            Gracias por enviarnos tu solicitud,

            Haz click en el siguiente enlace para confirmar la inscripción.

            <a href="http://localhost:3001/event/confirm/${eventCode}">¡Apúntate!</a>

            <h2>Descripción del evento ${eventInfo.nombre}</h2>
            
            <p>${eventInfo.descripcion}</p>
            
            <hr />
            Hecho con ❤ por el equipo de Hackathon
    `;

    await sendMailUtils(finalEmail, emailSubject, emailBody);

    res.status(200).json({
      message: "Te has inscrito con éxito",
    });
  } catch (error) {
    next(error);
  }
};

export default eventRegistrationController;
