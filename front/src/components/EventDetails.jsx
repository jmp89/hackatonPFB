import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getEventById from '../services/eventDetailsService';
import registerForEvent from '../services/registerEventService';
import { useAuth } from '../context/AuthContext';
import PushNotification from './PushNotification.jsx';
// TODO: Testear Toastify, borrar elementos inncesarios al tener toastify

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
                console.log('Event data:', eventData);
                setEvent(eventData);
            } catch (err) {
                console.error('Error fetching event:', err);
                setError('Error fetching event. Please try again later.');
                PushNotification(err.message, { type: 'error' });
            }
        };

        fetchEvent();
    }, [eventId]);

    const isLoggedIn = () => !!token;

    const handleButtonClick = async () => {
        if (!isLoggedIn()) {
           
            PushNotification('Necesitas loguearte primero', { type: 'error' });
            return;
        }

        try {
            await registerForEvent(eventId, token);

            
            PushNotification(
                'Te has inscrito correctamente al evento. Te llegará un correo con la confirmación',
                { type: 'success' }
            );
        } catch (err) {
            console.error('Error registering for event:', err);
            
            PushNotification('Ya estás registrado a este evento', {
                type: 'info',
            });
        }
    };

    if (error) {
        // return <p className="text-red-500">{error}</p>;
        return PushNotification(error.message, { type: 'error' });
    }

    if (!event) {
        return <p>Loading...</p>;
    }
    return (
        <main className="flex flex-col items-center justify-center px-4 py-3 lg:px-20 lg:py-10">
            <section className="text-center">
                <h1 className="text-2xl font-bold mt-10 lg:text-4xl">{event.name}</h1>
                <p className="font-medium mt-4 lg:mt-6 lg:text-lg">
                    Organizador: {event.organizer_name}
                </p>
                <p className="my-2 font-medium lg:text-lg">
                    {new Date(event.start_date).toLocaleDateString()} - {new Date(event.finish_date).toLocaleDateString()}
                </p>
                <p className="my-2 font-medium lg:text-lg">
                    {event.online_on_site !== 'on_site' ? 'Online' : `Ciudad: ${event.location}`}
                </p>
                <p className="my-2 font-medium lg:text-lg">Temáticas: {event.thematics}</p>
                <p className="my-2 font-medium lg:text-lg">Tecnologías: {event.technologies}</p>
            </section>
            <section className="text-center mt-10 mb-5 lg:mt-16 lg:mb-10">
                <h2 className="font-bold text-xl lg:text-3xl">¿QUÉ VAMOS A HACER?</h2>
                <p className="mt-5 max-w-6xl mx-auto lg:mt-8 lg:text-lg">{event.description}</p>
            </section>
            <p className="font-medium mt-5 lg:text-lg lg:mt-8">
                Total Participantes: {event.total_participants}
            </p>
    
            <button
                onClick={handleButtonClick}
                className="mt-5 bg-black text-white py-3 px-6 rounded-lg font-bold text-lg mb-4 hover:scale-105 transition-transform duration-300 flex items-center justify-center lg:text-xl lg:py-4 lg:px-8 lg:mt-8"
            >
                Apúntate
            </button>
        </main>
    );
};

export default EventDetails;
