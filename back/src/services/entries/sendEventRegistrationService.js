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
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
    <h1 style="color: #2c3e50;">¡Gracias por tu solicitud!</h1>
    <p style="font-size: 16px; margin-bottom: 20px;">
        A continuación, te proporcionamos los detalles de tu participación en el Hackathon:
    </p>

    <h2>Código de confirmación: </h2>
    <p style="color: #fff; background-color: #000; padding: 5px 15px; border-radius: 10px; margin: 0 25px; width: fit-content; height: fit-content; font-weight: bold; font-size: 1.2rem">${reservationCode}</p>

    <a href="http://${FRONT_URL}:${FRONT_PORT}/event/validate/activate" style="color: #fff; background-color: #000; padding: 15px 25px; border-radius: 10px; margin: 0 25px">INSERTA EL CÓDIGO DE CONFIRMACIÓN AQUI.</a>

    <hr style="border: 1px solid #ddd; margin: 20px 0;" />

    <h3 style="font-size: 16px; color: #2c3e50; margin-bottom: 10px;">¿De qué va ${eventInfo.name}?</h3>
    <p style="font-size: 16px; margin-bottom: 20px;">
        ${eventInfo.description}
    </p>

    <hr style="border: 1px solid #ddd; margin: 20px 0;" />

    <p style="text-align: center; font-size: 14px; color: #777;">
        Hecho con ❤ por el equipo de HackaVerse
    </p>
</div>
    `;

    await sendMailUtils(finalEmail, emailSubject, emailBody);
};

export default sendEventRegistrationMailService;
