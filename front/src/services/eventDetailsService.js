const API_URL = `${import.meta.env.VITE_API_URL}`;

const getEventById = async (eventId) => {
    try {
        const response = await fetch(`${API_URL}/event/details/${eventId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();


        
        if (!Array.isArray(data.data.eventDetails)) {
            throw new Error('Unexpected response format');
        }

       
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
