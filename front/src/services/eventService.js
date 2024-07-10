const API_URL = `${import.meta.env.API_URL}/event`;

export const fetchEvent = async (eventId, token) => {
    try {
        const response = await fetch(`${API_URL}/details/${eventId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new TypeError('Expected JSON response from server');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching event data:', error);
        throw error;
    }
};

export const saveEvent = async (event, token, eventId) => {
    const method = eventId ? 'PUT' : 'POST';
    const url = eventId ? `${API_URL}/${eventId}` : API_URL;

    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(event),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to save event');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error submitting form:', error);
        throw error;
    }
};
