import bcrypt from "bcrypt";
import getPool from "../../database/getPool.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";
import sendMailUtils from "../../utils/sendMailUtils.js";

const insertUserService = async (
  username,
  email,
  password,
  registrationCode
) => {
  const pool = await getPool();

  const [user] = await pool.query(
    `
            SELECT id FROM usuarios WHERE email=?
        `,
    [email]
  );

  if (user.length) {
    throw generateErrorsUtils("El email ya se encuentra registrado", 409);
  }

  /**logica de envio de email */
  const emailSubject = "Activa tu cuenta de Hackathon";

  const emailBody = `
            Bienvenid@

            Gracias por registrarse en Hackathon.
            Para activar tu cuenta debes hace click en el siguiente enlace

            <a href="http://localhost:3001/users/validate/${registrationCode}">Activar Cuenta</a>
            
            <small>O si lo prefieres, este es tu código de activación: ${registrationCode}</small>

            Saludos.
            <hr />
            Hecho con ❤ por el equipo de Hackathon
    `;

  try {
    await sendMailUtils(email, emailSubject, emailBody);
  } catch {
    return;
  }

  const passwordHashed = await bcrypt.hash(password, 10);

  await pool.query(
    `
            INSERT INTO usuarios (nombre, email, contraseña, registrationCode)
            VALUES (?,?,?,?)
        `,
    [username, email, passwordHashed, registrationCode]
  );
};

export default insertUserService;
