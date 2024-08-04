/* eslint-disable react/prop-types */
import { useState } from 'react';
import StarIcon from '../StarIcon';
import { Link } from 'react-router-dom';

const EventCardComponent = ({ event, onRate }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const handleRate = (rate) => {
        setRating(rate);
        onRate(event.id, rate);
    };

    return (
        <article className="mt-4 mb-4 w-full cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl">
            <div className="h-44 border rounded-lg shadow-md p-4 min-w-72 flex flex-col justify-center">
                <h3 className="text-lg font-bold mt-2 text-center">
                    {event.name}
                </h3>
                <p className="text-sm text-gray-600">{event.description}</p>
                <p className="text-center ">
                    <Link to={`/event/details/${event.id}`}>
                        Ver detalles del evento
                    </Link>
                </p>
                <div className="flex justify-center mt-4">
                    {[1, 2, 3, 4, 5].map((star, i) => (
                        <button
                            key={i}
                            className={`w-8 h-8 ${
                                (hover || rating) >= star
                                    ? 'text-black'
                                    : 'text-gray-300'
                            } hover:text-black`}
                            onClick={() => handleRate(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                        >
                            <StarIcon size={2} />
                        </button>
                    ))}
                </div>
            </div>
        </article>
    );
};

export default EventCardComponent;
