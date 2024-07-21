import sendMailUtils from "../../utils/sendMailUtils.js";
import generateErrorsUtils from "../../utils/generateErrorsUtils.js";

const sendRecoveryCodeEmailService = async (email, recoveryCode) => {
  const emailSubject = "Recuperación de contraseña";
  const emailBody = `
      Hola,

      Se ha solicitado un código de recuperación de contraseña.
      Tu código de recuperación es: ${recoveryCode}

      Ingresa este código en la aplicación para completar el proceso de recuperación.

      <a href="http://localhost:5173/users/reset-password" style="text-decoration: none; color: #fff; background-color: #000; padding: 15px 25px; border-radius: 10px; margin: 0 25px">Recuperar contraseña</a>

      Gracias,
      El equipo de Hackathon
  `;

  try {
    await sendMailUtils(email, emailSubject, emailBody);
  } catch (error) {
    throw generateErrorsUtils("Error al enviar el correo electrónico de recuperación de contraseña.", 400);
  }
};

export default sendRecoveryCodeEmailService;
  


