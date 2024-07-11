export const initiatePassword = async (email) => {
  try {
      const response = await fetch('http://localhost:3001/users/initiate-password', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email }),
      });

      if (!response.ok) {
          throw new Error('Usuario no encontrado');
      }

      const data = await response.json();
      console.log(data);
      return data;
  } catch (error) {
      console.error('Error:', error);
      throw error;
  }
};