export const resetPassword = async ({ email, recoverPassCode, newPassword }) => {

    const response = await fetch('http://localhost:3001/users/reset-password', {
        method: 'POST',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            recoverPassCode,
            newPassword,
        }),
    });
  
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message);
    }

    return data;

  };
  