const API_URL = `${import.meta.env.VITE_API_URL}`;

const getEventById = async (eventId) => {
    try {
        console.log('Fetching event with ID:', eventId);
        const response = await fetch(`${API_URL}/event/details/${eventId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data);

        // Verifica que data.data.eventDetails sea una lista
        if (!Array.isArray(data.data.eventDetails)) {
            throw new Error('Unexpected response format');
        }

        // Encuentra el evento basado en el id
        const event = data.data.eventDetails.find(event => event.id === parseInt(eventId, 10));

        if (!event) {
            throw new Error('Event not found');
        }

        return event;
    } catch (error) {
        console.error('Failed to fetch event:', error);
        throw error;
    }
};

export default getEventById;
