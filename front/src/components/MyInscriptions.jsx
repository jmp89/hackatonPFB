import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchMyInscriptionsService from "../services/fetchMyInscriptionsService";
import MyEventCard from "./MyEventCard";

const API_URL = import.meta.env.VITE_API_URL;
const eventDetailsURL = "/event/details/";

const MyInscriptions = ({
    token,
    PushNotification
}) => {

    const [ responseData, setResponseData ] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const myInscriptions = async () => {

            try {

                const inscriptionsList = await fetchMyInscriptionsService(token);

                setResponseData(inscriptionsList);

            } catch (error) {

                setResponseData(null);
                PushNotification(error.message, { type: "error" });
            };
        };

        myInscriptions();
    }, []);

    const handleEventClick = async (e, eventID) => {

        e.preventDefault();
        
        navigate(eventDetailsURL + eventID);
    };

    return (
        <>

        <h2 className="mt-10 text-2xl font-bold text-center">Mis eventos activos</h2>

        <ul className="mt-4 w-full grid grid-cols-auto-fit-minmax justify-evenly items-center">

            {responseData.length < 1 &&  <li className="mt-6 mb-6 text-lg text-center">No estás inscrito en ningún evento</li>}

            {responseData && responseData.map((event) => (

                <li key={event.id} className="w-full my-auto">

                    <MyEventCard 
                        event={event}
                        API_URL={API_URL}
                        handleEventClick={handleEventClick}
                    />

                </li>
            ))}
        </ul>
        </>
    );
};

export default MyInscriptions;