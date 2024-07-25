const API_URL = `${import.meta.env.VITE_API_URL}`;

const getEvents = async () => {
    try {
        const response = await fetch(`${API_URL}/event/search`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.data.eventsList;
    } catch (error) {
        console.error('Failed to fetch events:', error);
        throw error;
    }
};

export default getEvents