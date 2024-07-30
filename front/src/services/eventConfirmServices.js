const API_URL = `${import.meta.env.VITE_API_URL}`;

const eventConfirm = async (eventCode, token) => {
    try {
        const url = `${API_URL}/event/confirm/${eventCode}`;
        console.log('URL de la API:', url); // Verifica la URL

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
        }

        const data = await response.json();
        console.log('Datos de la API:', data); // Verifica los datos recibidos
        return data;
    } catch (error) {
        console.error('Error al confirmar el evento:', error);
        throw error;
    }
};

export default eventConfirm;
