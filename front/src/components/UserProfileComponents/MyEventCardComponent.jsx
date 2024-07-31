const MyEventCardComponent = ({
    event,
    API_URL,
    handleEventClick
}) => {


    return (
        <article className="mt-4 mb-4 h-36 overflow-hidden text-lg flex flex-row justify-between border rounded-lg shadow-md text-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl"
            onClick={(e) => handleEventClick(e, event.id)}>

            <section className="w-20 clip-path-polygonImage ">
                <img src={API_URL + event.image} alt="event-image" className="w-full h-full object-cover" />
            </section>

            <section className="w-full my-auto">
                <ul className="mr-2">
                    <li className="mt-4 font-bold">{event.name}</li>
                    <li className="mt-2">{event.thematics.join(", ")}</li>
                    <li className="mb-4">{event.technologies.join(", ")}</li>
                </ul>
            </section>

        </article>
    );
};

export default MyEventCardComponent;