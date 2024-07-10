export const initiatePassword = async () => {
    try {
      const response = await fetch('/users/initiate-password', {
       method: 'POST',
       headers: {
        'Content-Type': 'application/json'
       },
        body: JSON.stringify({email: "email"}),
      });
  
      if (!response.ok) {
        throw new Error('Error en la solicitud'+ response.statusText);
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  initiatePassword()