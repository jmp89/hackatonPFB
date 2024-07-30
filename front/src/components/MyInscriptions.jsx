import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchMyInscriptionsService from "../services/fetchMyInscriptionsService";
import PushNotification from "./PushNotification";

const API_URL = import.meta.env.VITE_API_URL;
const eventDetailsURL = "/event/details/";

const MyInscriptions = ({token}) => {

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

        <h2 className="mt-6 text-2xl font-bold text-center">Mis inscripciones</h2>

        <ul className="mt-4 w-full grid grid-cols-auto-fit-minmax justify-evenly items-center">

            {responseData.length < 1 &&  <li className="mt-6 mb-6 text-lg text-center">No estás inscrito en ningún evento</li>}

            {responseData && responseData.map((event) => (

                <li key={event.id} className="w-full my-auto">

                    <article className="mt-4 mb-4 h-36 overflow-hidden text-lg flex flex-row justify-between border rounded-lg shadow-md text-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl"
                        onClick={(e) => handleEventClick(e, event.id)}>

                        <section className="w-20 clip-path-polygonImage ">
                            <img src={API_URL + event.image} alt="event-image" className="w-full h-full object-cover" />
                        </section>

                        <section className="w-full">
                            <ul className="mr-2">
                                <li className="mt-4 font-bold">{event.name}</li>
                                <li className="mt-2">{event.thematics.join(", ")}</li>
                                <li className="mb-4">{event.technologies.join(", ")}</li>
                            </ul>
                        </section>

                    </article>

                </li>
            ))}
        </ul>
        </>
    );
};

export default MyInscriptions;