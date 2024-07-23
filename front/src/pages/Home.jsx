import { useState, useEffect } from 'react';
import getEvents from '../services/allEventService';


const Home = () => {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const recomendedEvents = async () => {
      try {
        const eventsData = await getEvents();
        setEvents(eventsData);
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };

    recomendedEvents();
  }, []);

  const nextEvents = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 4) % events.length);
  };

  
  const previousEvents = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 4 + events.length) % events.length);
  };
 
  return (
    <main className="container mx-auto px-4 py-8">  
      <section className="text-center">  
        <h1 className="text-4xl font-bold mt-10">¡BIENVENIDOS A HACKAVERSE!</h1>
        <p className="text-xl font-medium mt-4">LA MEJOR PLATAFORMA DE HACKATONES</p>
      </section>

      <section className="mt-10 text-center "> 
        <h2 className="text-2xl font-semibold mb-6">HACKATHONES RECOMENDADOS</h2>
        <div className="grid grid-cols-2 gap-4 w-full max-w-md sm:gap-6 md:max-w-6xl m:ml-20 ml-40 s">
          {events.slice(currentIndex, currentIndex + 4).map((event, index) => (
            <article key={index} className="border p-4 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold">{event.name}</h3>
              <p>{event.start_date.split('T')[0]} / {event.finish_date.split('T')[0]}</p>
              <p>Localidad: {event.location}</p>
              <p>Creado por: {event.organizer}</p>
              <p>Tecnología: {event.technologies}</p>
              <p>Temática: {event.thematics}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 flex justify-center"> 
        <button
          onClick={previousEvents}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300 mr-4"
        >
          Prev
        </button>
        <button onClick={nextEvents} className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300">
          Next
        </button>
      </section>
    </main>
  );
};

export default Home;
