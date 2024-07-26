// services/registerEventService.js
const API_URL = `${import.meta.env.VITE_API_URL}`;

const registerForEvent = async (eventID, token) => {
    try {
        const response = await fetch(`${API_URL}/event/register/${eventID}`, {
            method: 'GET', 
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error registering for event');
        }

        return response.json();
    } catch (error) {
        console.error('Error registering for event:', error);
        throw error;
    }
};

export default registerForEvent;
