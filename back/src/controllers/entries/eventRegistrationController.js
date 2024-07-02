import inscriptionToEvent from "../../services/users/inscriptionToEvent.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import sendMailUtils from "../../utils/sendMailUtils.js";
import Randomstring from "randomstring";
import jwt from "jsonwebtoken";
import "dotenv/config";
import getPool from "../../database/getPool.js";
import Joi from "joi";

const { SECRET } = process.env;

const eventRegistrationController = async (req, res, next) => {
  try {
    // Validacion Joi
    const eventRegistrationControllerSchema = Joi.object({
      eventID: Joi.number().positive.integer.required(),
    });

    const { error } = eventRegistrationControllerSchema.validate(req.body);

    if (error) {
      throw generateErrorsUtils(error.message, 400);
    }

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
        SELECT name, description
        FROM eventos
        WHERE id = ?
      `,
      [eventID]
    );

    const [email] = await pool.query(
      `
      SELECT email
      FROM users
      WHERE id = ?
      `,
      [id]
    );
    const finalEmail = email[0].email;

    const emailSubject = `Confirma tu inscripción en ${eventInfo.name}`;

    const emailBody = `
            Gracias por enviarnos tu solicitud, a continuación te mostramos un poco de qué va este Hackathon con más detalle:

            

            
            <h2>¿De qué va ${eventInfo.name}?</h2>
            
            <p>${eventInfo.description}</p>
            
            Haz click en el siguiente botón para confirmar la inscripción.

            
            <a href="http://localhost:3001/event/confirm/${eventCode}" style="color: #fff; background-color: #000; padding: 15px 25px; border-radius: 10px; margin: 0 25px">¡Apúntate!</a>

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
