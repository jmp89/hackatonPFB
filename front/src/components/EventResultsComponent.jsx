import { useEffect, useState } from "react";
import fetchEventsResultsService from "../services/fetchEventsResultsService";
import PushNotification from "./PushNotification";
import EventResultsCardComponent from "./EventResultsCardComponent";

const EventResultsComponent = () => {

    const [ responseData, setResponseData ] = useState([]);

    useEffect(() => {

        const getEventsResults = async () => {

            try {

                const eventsResults = await fetchEventsResultsService();

                setResponseData(eventsResults);

            } catch (error) {

                PushNotification(error.message, { type: "error" });
            };
        };

        getEventsResults();

    }, []);

    return (
        <main className="text-lg">

            <section className="mt-10 mx-auto flex flex-col bg-white px-6 rounded-t-lg shadow-md w-full max-w-3xl">
                
                <h2 className="mt-6 mb-2 text-2xl font-bold text-center">Resultados de eventos</h2>

                {responseData && responseData.length < 1
                
                    ? <p>No se encontraron eventos finalizados</p>

                    : <>

                        <ul className="flex flex-row flex-wrap justify-center gap-4">
                            
                        {responseData.map((event) => (

                            <li key={event.id}>

                                <EventResultsCardComponent event={event} />

                            </li>
                        ))}

                        </ul>
                    </>
                }


            </section>



        </main>
    );
};

export default EventResultsComponent;