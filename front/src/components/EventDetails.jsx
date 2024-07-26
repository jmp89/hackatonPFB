import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getEventById from '../services/eventDetailsService';
import registerForEvent from '../services/registerEventService';
import { useAuth } from '../context/AuthContext';

const EventDetails = () => {
    const { eventId } = useParams();
    const { token } = useAuth(); // Obtén el token del contexto
    const [event, setEvent] = useState(null);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

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

    const isLoggedIn = () => !!token;

    const handleButtonClick = async () => {
        if (!isLoggedIn()) {
            setMessage('Necesitas loguearte primero');
            return;
        }

        try {
            await registerForEvent(eventId, token); 
            setMessage('Te has inscrito correctamente al evento. Te llegará un correo con la confirmación');
        } catch (err) {
            console.error('Error registering for event:', err);
            setMessage('Ya estás registrado a este evento');
        }
    };

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!event) {
        return <p>Loading...</p>;
    }

    return (
        <main className="flex flex-col items-center justify-center px-4 py-3">
            <section className="text-center">
                <h1 className="text-xl font-bold mt-10">{event.name}</h1>
                <p className="font-medium mt-4">
                    Organizador: {event.organizer || 'Not available'}
                </p>
                <p className="my-2 font-medium">
                    {new Date(event.start_date).toLocaleDateString()} -
                    {new Date(event.finish_date).toLocaleDateString()}
                </p>
                <p className="my-2 font-medium">
                    {event.online_on_site !== 'on_site'
                        ? 'Online'
                        : `Ciudad: ${event.location}`}
                </p>
                <p className="my-2 font-medium">Thematics: {event.thematics}</p>
                <p className="my-2 font-medium">
                    Technologies: {event.technologies}
                </p>
            </section>
            <section className="text-center mt-10 mb-5">
                <h2 className="font-bold">¿QUÉ VAMOS A HACER?</h2>
                <p className="mt-5">{event.description}</p>
            </section>
            <p className="font-medium mt-5">
                Total Participants: {event.total_participants}
            </p>

            <button
                onClick={handleButtonClick}
                className="mt-5 bg-black text-white py-3 px-6 rounded-lg font-bold text-lg mb-4 hover:scale-105 transition-transform duration-300 flex items-center justify-center"
            >
                Apúntate
            </button>

            {message && <p className="mt-3 text-red-500">{message}</p>}
        </main>
    );
};

export default EventDetails;
