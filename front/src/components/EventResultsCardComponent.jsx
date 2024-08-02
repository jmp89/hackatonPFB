const API_URL = import.meta.env.VITE_API_URL;

const EventResultsCardComponent = ({event}) => {

    const sortedUserInfo = event.user_info.sort((a, b) => b.user_score - a.user_score);

    const starsRating = () => {

        const stars = [];

        for (let i = 0; i < event.rating; i++){
            stars.push(<img key={i} src={API_URL + "/media/black-star-icon.svg"} alt="star-svg" className="w-6 h-6" />)
        };

        return stars;
    }

    return (
        <article className="mt-4 mb-4 flex flex-col items-center border rounded-lg shadow-md text-center cursor-pointer overflow-hidden w-80 sm:w-eventCard cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl">

            <section className="w-full clip-path-polygonImage2 relative flex flex-row justify-center">
                <img src={`${API_URL}${event.image}`} alt="event-image" className="h-36 w-full" />
                <h3 className="absolute top-[calc(30%)] p-2 font-bold text-white rounded-lg bg-black bg-opacity-75">
                    {event.name}</h3>
            </section>

            <section>

                <ul key={event.id} className="mx-2 mb-4">

                    <li className="mt-2">{event.thematics.join(", ")}</li>
                    <li className="mt-2">{event.technologies.join(", ")}</li>
                    <li className="mt-2">{event.online_on_site}</li>
                    <li className="mt-2">{event.location}</li>
                    <li className="mt-2">{event.start_date.slice(0, 10)} / {event.finish_date.slice(0, 10)}</li>
                    <li className="mt-2 mb-2 flex flex-row justify-center items-center">
                        <img src={API_URL + (event.organizer_avatar || "/media/userProfile.svg")} alt="organizer-avatar"
                            className="w-10 h-10 mr-2" />
                        {event.organizer}</li>
                    <li className="flex flex-row justify-center">{starsRating()}</li>

                </ul>

            </section>

            <section className="w-full flex flex-col">

            <h4 className="mt-2 mx-2 font-bold">Ganadores</h4>

            {sortedUserInfo.map((user) => (
            
                <ul key={user.id} className="mt-4 mb-4 flex flex-row items-center">

                    <li className="ml-2"><img src={API_URL + (user.avatar || "/media/userProfile.svg")} alt="user-avatar"
                        className="w-10 h-10" />
                        </li>
                    <li className="mx-auto">{user.username}</li>
                    <li className="mr-2">{user.user_score} <span className="text-sm">
                        pts</span></li>

                </ul>
            ))}

            </section>

        </article>
    );
};

export default EventResultsCardComponent;