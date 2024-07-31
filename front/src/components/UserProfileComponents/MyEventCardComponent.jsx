const MyEventCardComponent = ({
    event,
    API_URL,
    handleEventClick,
    handleUnlistClick,
    loading,
}) => {
    return (
        <div className="relative mt-4 mb-4 hover:scale-105 transition-transform duration-300">
            <article
                className="h-36 overflow-hidden text-lg flex flex-row justify-between border rounded-t-lg shadow-md text-center cursor-pointer"
                onClick={(e) => handleEventClick(e, event.id)}
            >
                <section className="w-20 clip-path-polygonImage">
                    <img
                        src={API_URL + event.image}
                        alt="event-image"
                        className="w-full h-full object-cover"
                    />
                </section>

                <section className="w-full my-auto justify-center">
                    <ul className="mr-2 grow-1">
                        <li className="mt-4 font-bold">{event.name}</li>
                        <li className="mt-2">{event.thematics.join(', ')}</li>
                        <li className="mb-4">
                            {event.technologies.join(', ')}
                        </li>
                    </ul>
                </section>
            </article>
            <button
                className="w-full bg-red-500 text-white text-sm py-1 rounded-b-lg hover:font-bold"
                onClick={(e) => handleUnlistClick(e, event.id)}
                disabled={loading}
            >
                {loading ? 'Cancelando...' : 'Cancelar inscripción'}
            </button>
        </div>
    );
};

export default MyEventCardComponent;
