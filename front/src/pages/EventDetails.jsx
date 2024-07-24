import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getEventById from '../services/eventDetailsService';

const EventDetails = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                console.log('Fetching event with ID:', eventId);
                const eventData = await getEventById(eventId);
                setEvent(eventData);
            } catch (err) {
                console.error('Error fetching event:', err);
                setError('Error fetching event. Please try again later.');
            }
        };

        fetchEvent();
    }, [eventId]);

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!event) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{event.name}</h1>
            <p>Location: {event.location}</p>
            <p>Start Date: {new Date(event.start_date).toLocaleDateString()}</p>
            <p>Finish Date: {new Date(event.finish_date).toLocaleDateString()}</p>
            <p>Thematics: {event.thematics}</p>
            <p>Technologies: {event.technologies}</p>
            <p>Online/On-site: {event.online_on_site}</p>
            <p>Organizer: {event.organizer || 'Not available'}</p>
            <p>Total Participants: {event.total_participants}</p>
        </div>
    );
};

export default EventDetails;
