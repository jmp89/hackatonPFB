import sendMailUtils from "../../utils/sendMailUtils.js";
import getPool from "../../database/getPool.js";

const sendEventRegistrationMailService = async (eventID, id, eventCode) => {

    const pool = await getPool();

    const [[eventInfo]] = await pool.query(`
                SELECT name, description
                FROM events
                WHERE id = ?
            `, [eventID]
    );

    const [email] = await pool.query(`
                SELECT email
                FROM users
                WHERE id = ?
            `, [id]
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

};

export default sendEventRegistrationMailService;