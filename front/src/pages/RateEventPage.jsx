import { useEffect, useState } from 'react';
import EventCard from '../components/EventCard';
import { useAuth } from '../context/AuthContext';

const RateEventPage = () => {
    const [events, setEvents] = useState([]);
    const { token } = useAuth();

    useEffect(() => {
        if (!token) {
            console.error('Debes iniciar sesión.');
            return;
        }

        fetch(import.meta.env.VITE_API_URL + '/users/my-finished-events', {
            headers: {
                Authorization: `${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `Ha ocurrido un error, status: ${response.status}`
                    );
                }
                return response.json();
            })
            .then((data) => {
                if (data.status === 'ok') {
                    setEvents(data.events);
                } else {
                    console.error(
                        'Fallo al recuperar los eventos:',
                        data.message
                    );
                }
            })
            .catch((error) => {
                console.error('Error recuperando eventos:', error);
            });
    }, [token]);

    const handleRate = (eventId, rating) => {
        if (!token) {
            console.error('Debes iniciar sesión.');
            return;
        }

        fetch(import.meta.env.VITE_API_URL + '/users/rate-event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`,
            },
            body: JSON.stringify({ eventId, rating }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `Ha ocurrido un error, status: ${response.status}`
                    );
                }
                return response.json();
            })
            .then((data) => {
                if (data.status === 'ok') {
                    console.log('Valoración enviada con éxito');
                } else {
                    console.error('Fallo al enviar valoración');
                }
            })
            .catch((error) => {
                console.error('Error enviando la valoración:', error);
            });
    };

    return (
        <article className="grid grid-cols-auto-fit-minmax gap-4 p-4 mx-auto max-w-screen-lg justify-center">
            {events.map((event, i) => (
                <EventCard key={i} event={event} onRate={handleRate} />
            ))}
        </article>
    );
};

export default RateEventPage;
