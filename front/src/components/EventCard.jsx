/* eslint-disable react/prop-types */
import { useState } from 'react';
import StarIcon from './StarIcon';

const EventCard = ({ event, onRate }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const handleRate = (rate) => {
        setRating(rate);
        onRate(event.id, rate);
    };

    return (
        <div className="border rounded-lg shadow-md p-4 min-w-72">
            {/* <img
                src={event.image}
                alt={event.event_name}
                className="w-full h-48 object-cover rounded-t-lg"
            /> */}
            <h3 className="text-lg font-bold mt-2 text-center">{event.name}</h3>
            <p className="text-sm text-gray-600">{event.description}</p>
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
                        <StarIcon />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default EventCard;
