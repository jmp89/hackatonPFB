import sendMailUtils from '../../utils/sendMailUtils.js';
import getPool from '../../database/getPool.js';
import 'dotenv/config';

const { FRONT_PORT, FRONT_URL } = process.env;

const sendEventRegistrationMailService = async (eventID, userID) => {
    const pool = await getPool();

    // Obtener la información del evento y el código de reserva
    const [[eventInfo]] = await pool.query(
        `
        SELECT e.name, e.description, p.reservation_code
        FROM events e
        JOIN participates p ON e.id = p.event_id
        WHERE e.id = ? AND p.user_id = ?
            `,
        [eventID, userID]
    );

    // Obtener el correo electrónico del usuario
    const [[email]] = await pool.query(
        `
                SELECT email
                FROM users
                WHERE id = ?
            `,
        [userID]
    );

    const finalEmail = email.email;
    const reservationCode = eventInfo.reservation_code;

    const emailSubject = `Confirma tu inscripción en ${eventInfo.name}`;

    const emailBody = `
        <h1>Gracias por enviarnos tu solicitud, a continuación te mostramos un poco de qué va este Hackathon con más detalle:</h1>

        <p style="color: #fff; background-color: #000; padding: 5px 15px; border-radius: 10px; margin: 0 25px; width: fit-content; height: fit-content; font-weight: bold; font-size: 1.2rem">Código de confirmación: ${reservationCode}</p>

        <a href="http://${FRONT_URL}:${FRONT_PORT}/event/validate/activate" style="color: #fff; background-color: #000; padding: 15px 25px; border-radius: 10px; margin: 0 25px">Haz click aquí para confirmar la inscripción.</a>

        <hr />

        
        <h2>¿De qué va ${eventInfo.name}?</h2>
        
        <p>${eventInfo.description}</p>
        
        
        <a href="http://${FRONT_URL}:${FRONT_PORT}/event/validate/activate" style="color: #fff; background-color: #000; padding: 15px 25px; border-radius: 10px; margin: 0 25px">Haz click aqui para confirmar la inscripción.</a>

        <hr />
        Hecho con ❤ por el equipo de HackaVerse
    `;

    await sendMailUtils(finalEmail, emailSubject, emailBody);
};

export default sendEventRegistrationMailService;
