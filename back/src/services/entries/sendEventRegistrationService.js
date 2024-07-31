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
        <h1></h1>Gracias por enviarnos tu solicitud, a continuación te mostramos un poco de qué va este Hackathon con más detalle:
        </h1>
        <h2>¿De qué va ${eventInfo.name}?</h2>
        
        <p>${eventInfo.description}</p>
        
        
        <a href="http://localhost:5173/event/confirm/${eventCode}" style="color: #fff; background-color: #000; padding: 15px 25px; border-radius: 10px; margin: 0 25px">Haz click aqui para confirmar la inscripción.</a>

        <hr />
        Hecho con ❤ por el equipo de Hackathon
    `;

    await sendMailUtils(finalEmail, emailSubject, emailBody);

};

export default sendEventRegistrationMailService;