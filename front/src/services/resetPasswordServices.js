 export const resetPassword = async (email, recoverPassCode, newPassword) => {
    try {
      const response = await fetch('localhost:3001/users/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          recoverPassCode,
          newPassword,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Error en la solicitud'+ response.statusText);
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error sending verification code:', error);
    }
  };
  
  resetPassword()