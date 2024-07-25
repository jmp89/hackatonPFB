import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { useAuth } from '../context/AuthContext';

const RateEventPage = () => {
    const [events, setEvents] = useState([]);
    const [countdown, setCountdown] = useState(5);
    const [redirect, setRedirect] = useState(false);
    const { token } = useAuth();

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
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `${token}`,
                                credentials: 'include',
                            },
                        }
                    );

                    if (!response.ok) {
                        throw new Error(
                            `Ha ocurrido un error, status: ${response.status}`
                        );
                    }

                    const data = await response.json();

                    if (data.status === 'ok') {
                        setEvents(data.events);
                    } else {
                        console.error(
                            'Fallo al recuperar los eventos:',
                            data.message
                        );
                    }
                } catch (error) {
                    console.error('Error recuperando eventos:', error);
                }
            };

            fetchEvents();
        }
    }, [token]);

    const handleRate = async (eventId, rating) => {
        if (!token) {
            console.error('Debes iniciar sesión.');
            return;
        }

        try {
            const response = await fetch(
                import.meta.env.VITE_API_URL + '/users/rate-event',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${token}`,
                        credentials: 'include',
                    },
                    body: JSON.stringify({ eventId, rating }),
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Ha ocurrido un error, status: ${response.status}`
                );
            }

            const data = await response.json();

            if (data.status === 'ok') {
                console.log('Valoración enviada con éxito');
            } else {
                console.error('Fallo al enviar valoración');
            }
        } catch (error) {
            console.error('Error enviando la valoración:', error);
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
        <article className="grid grid-cols-auto-fit-minmax gap-4 p-4 mx-auto max-w-screen-lg justify-center">
            {events.map((event, i) => (
                <EventCard key={i} event={event} onRate={handleRate} />
            ))}
        </article>
    );
};

export default RateEventPage;
