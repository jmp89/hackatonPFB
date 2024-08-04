const API_URL = import.meta.env.VITE_API_URL;

const checkRegistration = async (eventId, token) => {
    try {
        const response = await fetch(
            `${API_URL}/event/check-registration/${eventId}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(
                error.message || 'Error al verificar la inscripción'
            );
        }

        return await response.json();
    } catch (error) {
        console.error('Error verificando inscripción:', error.message);
        throw error;
    }
};

export default checkRegistration;
