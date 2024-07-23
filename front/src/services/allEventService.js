// src/services/eventService.js
const getEvents = async (filter, sort, direction) => {
    const queryString = new URLSearchParams({ filter, sort, direction }).toString();
    const response = await fetch(`http://localhost:3001/event/search`);
    if (!response.ok) {
        throw new Error('Error fetching events');
    }
    const result = await response.json();
    return result.data.eventsList; 
};

export default getEvents;
