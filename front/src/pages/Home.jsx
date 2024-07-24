import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getEvents from "../services/lastEventService";

const Home = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventsData = await getEvents();
                const sortedEvents = eventsData
                    .sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
                    .reduce((acc, event) => {
                        if (!acc.some(e => e.id === event.id) && acc.length < 4) {
                            acc.push(event);
                        }
                        return acc;
                    }, []);
                setEvents(sortedEvents);
            } catch (err) {
                console.error('Error fetching events:', err);
                setError('Error fetching events. Please try again later.');
            }
        };

        fetchEvents();
    }, []);




    const handleEventClick = (eventId) => {
        navigate(`/event/details/${eventId}`);
    }

    return (
        <main className="container mx-auto px-4 py-8">  
            <section className="text-center">  
                <h1 className="text-4xl font-bold mt-10">¡BIENVENIDOS A HACKAVERSE!</h1>
                <p className="text-xl font-medium mt-4">LA MEJOR PLATAFORMA DE HACKATONES</p>
            </section>

            <section className="mt-10 text-center"> 
                <h2 className="text-2xl font-semibold mb-6">ÚLTIMOS HACKATHONES</h2>
                {error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-6xl mx-auto">
                        {Array.isArray(events) && events.map((event, index) => (
                            <article 
                                key={event.id || index} 
                                className="border p-4 rounded-lg shadow-md text-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl"
                                onClick={() => handleEventClick(event.id)}
                            >
                                <h3 className="text-xl font-bold">{event.name}</h3>
                                <p>{event.start_date.split('T')[0]} / {event.finish_date.split('T')[0]}</p>
                                <p>Localidad: {event.location}</p>
                                <p>Creado por: {event.organizer}</p>
                                <p>Tecnología: {event.technologies}</p>
                                <p>Temática: {event.thematics}</p>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
};

export default Home;
