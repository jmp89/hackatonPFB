import sendMailUtils from '../../utils/sendMailUtils.js';
import generateErrorsUtils from '../../utils/generateErrorsUtils.js';



const sendRecoveryCodeEmailService = async (email, recoveryCode) => {
    const emailSubject = 'Recuperación de contraseña';
    const emailBody = `
      Hola,

      Se ha solicitado un código de recuperación de contraseña.
      Tu código de recuperación es:
      
      <div style="color: #fff; background-color: #000; padding: 5px 15px; border-radius: 10px; margin: 0 25px; width: fit-content; height: fit-content; font-weight: bold; font-size: 1.2rem">${recoveryCode}</div>

 

            <hr />
            Hecho con ❤ por el equipo de HackaVerse
  `;

    try {
        await sendMailUtils(email, emailSubject, emailBody);
    } catch (error) {
        throw generateErrorsUtils(
            'Error al enviar el correo electrónico de recuperación de contraseña.',
            400
        );
    }
};

export default sendRecoveryCodeEmailService;
