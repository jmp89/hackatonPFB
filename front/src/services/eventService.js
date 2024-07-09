// eventService.js

const API_URL = `${import.meta.env.VITE_API_URL}/event`;

export const fetchEvent = async (eventId, token) => {
    try {
        const response = await fetch(`${API_URL}/${eventId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Error fetching event data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const saveEvent = async (event, token, eventId) => {
    try {
        const url = eventId
            ? `${API_URL}/update/${eventId}`
            : `${API_URL}/create`;
        const method = eventId ? 'PUT' : 'POST';
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(event),
        });
        if (!response.ok) {
            throw new Error('Error submitting form');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
