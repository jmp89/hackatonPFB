import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getEvents from '../services/lastEventService';
import PushNotification from './PushNotification.jsx';

const API_URL = import.meta.env.VITE_API_URL;

const Home = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventsData = await getEvents();
                const sortedEvents = eventsData
                    .sort(
                        (a, b) =>
                            new Date(b.start_date) - new Date(a.start_date)
                    )
                    .reduce((acc, event) => {
                        if (
                            !acc.some((e) => e.id === event.id) &&
                            acc.length < 4
                        ) {
                            acc.push(event);
                        }
                        return acc;
                    }, []);
                setEvents(sortedEvents);
            } catch (err) {
                console.error('Error fetching events:', err);
                setError('Error fetching events. Please try again later.');
                PushNotification(err.message, { type: 'error' });
            }
        };

        fetchEvents();
    }, []);

    const handleEventClick = (eventId) => {
        navigate(`/event/details/${eventId}`);
    };

    return (
        <section className="w-full h-full px-0 py-8 text-center">
            <section className="py-8 h-56 bg-zinc-800 text-white sd:h-auto">
                <div className="container mx-auto px-4 md:px-6">
                    <h1 className="text-4xl font-bold mt-10">
                        ¡BIENVENIDOS A HACKAVERSE!
                    </h1>
                    <p className="text-xl font-medium mt-4">
                        LA MEJOR PLATAFORMA DE HACKATONES
                    </p>
                </div>
            </section>

            <section className="mt-10 text-center">
                <h2 className="text-2xl font-semibold mb-20">
                    ÚLTIMOS HACKATHONES
                </h2>
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
                        {Array.isArray(events) &&
                            events.map((event, index) => {
                                const isFinished =
                                    new Date(event.finish_date) < new Date();

                                return (
                                    <article
                                        key={event.id || index}
                                        className="border p-4 rounded-lg shadow-md text-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl max-w-[800px] max-h-[800px] flex"
                                        onClick={() =>
                                            handleEventClick(event.id)
                                        }
                                    >
                                        <div className="w-1/3 flex-shrink-0 h-full">
                                            <img
                                                src={API_URL + event.image}
                                                alt="event-image"
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        </div>
                                        <div className="w-2/3 pl-4 flex flex-col justify-between">
                                            <h3 className="text-xl font-bold">
                                                {event.name}
                                            </h3>
                                            <p>
                                                Organizador:{' '}
                                                {event.organizer_name}
                                            </p>
                                            <p>
                                                {' '}
                                                Inicio:{' '}
                                                {
                                                    event.start_date.split(
                                                        'T'
                                                    )[0]
                                                }{' '}
                                            </p>
                                            <p>
                                                {' '}
                                                Fin:{' '}
                                                {
                                                    event.finish_date.split(
                                                        'T'
                                                    )[0]
                                                }
                                            </p>
                                            {/* <p>Localidad: {event.location}</p> */}
                                            <p>
                                                {event.online_on_site !==
                                                'on_site'
                                                    ? 'Online'
                                                    : `Ciudad: ${event.location}`}
                                            </p>
                                            <p>
                                                Tecnología: {event.technologies}
                                            </p>
                                            <p>Temática: {event.thematics}</p>
                                            {isFinished && (
                                                <p className="text-red-700 font-bold">
                                                    Evento finalizado
                                                </p>
                                            )}
                                        </div>
                                    </article>
                                );
                            })}
                    </div>
                )}
            </section>
        </section>
    );
};

export default Home;
