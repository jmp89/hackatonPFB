// unregisterEventService.js

const API_URL = import.meta.env.VITE_API_URL;

const unlistFromEvent = async (eventId, token) => {
    try {
        const response = await fetch(`${API_URL}/event/unlist/${eventId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(
                error.message || 'Error al cancelar la inscripción'
            );
        }
    } catch (error) {
        console.error('Error en la cancelación:', error.message);
        throw error;
    }
};

export default unlistFromEvent;
