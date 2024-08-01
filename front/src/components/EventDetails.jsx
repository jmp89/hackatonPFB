import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getEventById from '../services/eventDetailsService';
import registerForEvent from '../services/registerEventService';
import { useAuth } from '../context/AuthContext';
import PushNotification from './PushNotification.jsx';

const API_URL = import.meta.env.VITE_API_URL;
const EventDetails = () => {
    const { eventId } = useParams();
    const { token } = useAuth();
    const [event, setEvent] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                // console.log('Fetching event with ID:', eventId);
                const eventData = await getEventById(eventId);
                // console.log('Event data:', eventData);
                setEvent(eventData);
            } catch (err) {
                console.error('Error fetching event:', err);

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
        <section className="flex flex-col items-center justify-center px-4 py-3 xl2:px-8 xl2:py-6">
            {/* Contenedor para la imagen y el título */}
            <section className="relative w-full max-w-[900px] mb-10 xl2:max-w-[70vw] xl2:mb-14">
                {/* Background Image Container */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={API_URL + event.image}
                        alt="event-background"
                        className="w-full h-[200px] object-cover rounded-lg xl2:h-[300px]"
                    />
                </div>
                {/* Foreground Title */}
                <div className="relative z-10 flex flex-col items-center text-center">
                    <h1 className="text-4xl font-bold mt-10 px-4 py-2 rounded-lg inline-block bg-opacity-80 bg-black text-white xl2:text-6xl xl2:mt-12 xl2:px-6 xl2:py-3">
                        {event.name}
                    </h1>
                </div>
            </section>
            {/* Contenedor para la información adicional */}
            <section className="relative w-full max-w-[900px] bg-white p-6 rounded-lg shadow-md mt-12 xl2:max-w-[70vw] xl2:p-8 xl2:mt-16">
                <div className="text-center">
                    {event.organizer_name && (
                        <p>
                            <span className="font-bold uppercase mt-4">
                                ORGANIZADOR:
                            </span>
                        </p>
                    )}
                    {event.organizer_name && <p>{event.organizer_name}</p>}
                    <p className="my-3 xl2:my-4 font-bold">
                        {new Date(event.start_date).toLocaleDateString()} -
                        {new Date(event.finish_date).toLocaleDateString()}
                    </p>
                    <p className="mt-3 font-medium xl2:mt-4">
                        {event.online_on_site !== 'on_site' ? (
                            <span className="font-bold uppercase">ONLINE</span>
                        ) : (
                            <>
                                <span className="font-bold uppercase">
                                    CIUDAD:
                                </span>
                                <p>{event.location}</p>
                            </>
                        )}
                    </p>
                    <p className="mt-3 xl2:mt-4">
                        <span className="font-bold uppercase">TEMÁTICA:</span>
                    </p>
                    <p>{event.thematics}</p>
                    <p className="mt-3 xl2:mt-4">
                        <span className="font-bold uppercase">
                            TECNOLOGÍAS:
                        </span>
                    </p>
                    <p>{event.technologies}</p>
                    <section className="text-center mt-7 mb-5 w-full max-w-[70vw] mx-auto xl2:mt-10 xl2:mb-7">
                        <h2 className="font-bold">¿QUÉ VAMOS A HACER?</h2>
                        <p className="mt-5 xl2:mt-7">{event.description}</p>
                    </section>
                    {event.total_participants && (
                        <p className="font-bold uppercase mt-5 xl2:mt-7">
                            TOTAL PARTICIPANTES: {event.total_participants}
                        </p>
                    )}
                </div>
            </section>
            <button
                onClick={handleButtonClick}
                className="mt-5 bg-black text-white py-3 px-6 rounded-lg font-bold text-lg mb-4 hover:scale-105 transition-transform duration-300 flex items-center justify-center xl2:py-4 xl2:px-8 xl2:text-xl xl2:mt-7"
            >
                Apúntate
            </button>
        </section>
    );
};

export default EventDetails;
