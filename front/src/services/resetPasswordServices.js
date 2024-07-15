export const resetPassword = async ({ email, recoverPassCode, newPassword, repeatNewPassword }) => {
    try {
        const response = await fetch('http://localhost:3001/users/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                recoverPassCode,
                newPassword,
                repeatNewPassword,
            }),
        });
  
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }
  
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en el restablecimiento de contraseña:', error);
        throw error;
    }
  };
  