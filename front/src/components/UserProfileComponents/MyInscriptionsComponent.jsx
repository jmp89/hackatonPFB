import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchMyInscriptionsService from '../../services/fetchMyInscriptionsService';
import MyEventCardComponent from './MyEventCardComponent';

const API_URL = import.meta.env.VITE_API_URL;
const eventDetailsURL = '/event/details/';

const MyInscriptionsComponent = ({ token, PushNotification }) => {
    const [responseData, setResponseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const myInscriptions = async () => {
            try {
                const inscriptionsList = await fetchMyInscriptionsService(
                    token
                );
                setResponseData(inscriptionsList);
            } catch (error) {
                setResponseData(null);
                PushNotification(error.message, { type: 'error' });
            }
        };

        myInscriptions();
    }, [token, PushNotification]);

    const handleEventClick = (e, eventID) => {
        e.preventDefault();
        navigate(eventDetailsURL + eventID);
    };

    const handleUnlistClick = async (e, eventID) => {
        e.stopPropagation();
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/event/unlist/${eventID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`,
                },
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(
                    responseData.message || 'Error al cancelar la inscripción.'
                );
            }

            setResponseData((prevData) =>
                prevData.filter((event) => event.id !== eventID)
            );
            PushNotification(responseData.message, { type: 'success' });
        } catch (error) {
            PushNotification(error.message, { type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h2 className="mt-10 text-2xl font-bold text-center">
                Mis eventos activos
            </h2>

            <ul className="mt-4 w-full grid grid-cols-auto-fit-minmax justify-evenly items-center gap-2">
                {responseData.length < 1 && (
                    <li className="mt-6 mb-6 text-lg text-center">
                        No estás inscrito en ningún evento
                    </li>
                )}

                {responseData &&
                    responseData.map((event) => (
                        <li key={event.id} className="w-full my-auto">
                            <MyEventCardComponent
                                event={event}
                                API_URL={API_URL}
                                handleEventClick={handleEventClick}
                                handleUnlistClick={handleUnlistClick}
                                loading={loading}
                            />
                        </li>
                    ))}
            </ul>
        </>
    );
};

export default MyInscriptionsComponent;
