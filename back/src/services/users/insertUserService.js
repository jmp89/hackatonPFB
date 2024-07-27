import bcrypt from 'bcrypt';
import getPool from '../../database/getPool.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';
import sendMailUtils from '../../utils/sendMailUtils.js';
import 'dotenv/config';

const { FRONT_URL, FRONT_PORT } = process.env;

const insertUserService = async (
    username,
    email,
    password,
    registrationCode
) => {
    const pool = await getPool();

    const [user] = await pool.query(
        `
            SELECT id FROM users WHERE email=?
        `,
        [email]
    );

    if (user.length) {
        throw generateErrorsUtils('El email ya se encuentra registrado', 409);
    }

    /**logica de envio de email */
    const emailSubject = 'Activa tu cuenta de Hackathon';

    const emailBody = `
            Bienvenid@

            Gracias por registrarse en HackaVerse.
            Para activar tu cuenta debes copiar el siguiente código:

              <div style="color: #fff; background-color: #000; padding: 5px 15px; border-radius: 10px; margin: 0 25px; width: fit-content; height: fit-content; font-weight: bold; font-size: 1.2rem">${registrationCode}</div>

            Y luego insertarlo en la siguiente página:

            <a href="http://${FRONT_URL}:${FRONT_PORT}/users/validate/activate" style="text-decoration: none; color: #fff; background-color: #000; padding: 15px 25px; border-radius: 10px; margin: 0 25px">Activar Cuenta</a>
            
       
            <hr />
            Hecho con ❤ por el equipo de HackaVerse
    `;

    try {
        await sendMailUtils(email, emailSubject, emailBody);
    } catch {
        return;
    }

    const passwordHashed = await bcrypt.hash(password, 10);

    await pool.query(
        `
            INSERT INTO users (name, email, password, registration_code)
            VALUES (?,?,?,?)
        `,
        [username, email, passwordHashed, registrationCode]
    );
};

export default insertUserService;
