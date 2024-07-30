import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import EventCard from '../components/EventCard';

const RateEventPage = ({
    token,
    PushNotification
}) => {
    const [events, setEvents] = useState([]);
    const [countdown, setCountdown] = useState(5);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!token) {
            const timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);

            const redirectTimer = setTimeout(() => {
                setRedirect(true);
            }, 5000);

            return () => {
                clearInterval(timer);
                clearTimeout(redirectTimer);
            };
        } else {
            const fetchEvents = async () => {
                try {
                    const response = await fetch(
                        import.meta.env.VITE_API_URL +
                            '/users/my-finished-events',
                        {
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `${token}`,
                            },
                        }
                    );

                    if (!response.ok) {
                        PushNotification(
                            `Ha ocurrido un error, status: ${response.status}`,
                            { type: 'error' }
                        );
                        throw new Error(
                            `Ha ocurrido un error, status: ${response.status}`
                        );
                    }

                    const data = await response.json();

                    if (data.status === 'ok') {
                        setEvents(data.events);
                    } else {
                        PushNotification(
                            `Fallo al recuperar los eventos: ${data.message}`,
                            { type: 'error' }
                        );
                    }
                } catch (error) {
                    PushNotification(error.message, { type: 'error' });
                }
            };

            fetchEvents();
        }
    }, [token]);

    const handleRate = async (eventId, rating) => {
        if (!token) {
            PushNotification('Debes iniciar sesión', { type: 'error' });
            return;
        }

        try {
            const response = await fetch(
                import.meta.env.VITE_API_URL + '/users/rate-event',
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${token}`,
                    },
                    body: JSON.stringify({ eventId, rating }),
                }
            );

            if (!response.ok) {
                PushNotification(
                    `Ha ocurrido un error, status: ${response.status}`,
                    { type: 'error' }
                );
                throw new Error(
                    `Ha ocurrido un error, status: ${response.status}`
                );
            }

            const data = await response.json();

            if (data.status === 'ok') {
                PushNotification('Valoración enviada con éxito', {
                    type: 'success',
                });
            } else {
                PushNotification('Fallo al enviar valoración', {
                    type: 'error',
                });
            }
        } catch (error) {
            PushNotification(error.message, { type: 'error' });
        }
    };

    if (!token) {
        if (redirect) {
            return <Navigate to="/users/login" />;
        } else {
            return (
                <>
                    <p className="text-red-600 text-center mt-10 font-bold underline">
                        <Link to={'/users/login'}> Debes iniciar sesión.</Link>
                    </p>
                    <p className="text-black text-center mt-4">
                        Redirigiendo en {countdown} segundos...
                    </p>
                </>
            );
        }
    }

    return (
        <>
        <h2 className='mt-10 text-2xl font-bold text-center'>Mis eventos finalizados</h2>
        <section className="mt-4 w-full grid grid-cols-auto-fit-minmax justify-evenly items-center">
            {events.map((event, i) => (
                <EventCard key={i} event={event} onRate={handleRate} />
            ))}
        </section>
        </>
    );
};

export default RateEventPage;