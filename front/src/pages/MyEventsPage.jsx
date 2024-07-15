import { useEffect, useState } from "react";
import {useAuth} from "../context/AuthContext";

const MyEventsPage = () => {

    const { token, removeToken, updateToken } = useAuth();

    const [ responseData, setResponseData ] = useState([]);
    const [ responseError, setResponseError ] = useState("");
    const [ boton, setBoton ] = useState();

    useEffect(() => {

        const fetchMyEvents = async () => {

            try {

                const authorization = token;
        
                if (!authorization){
                    throw new Error("Debe iniciar sesión.");
                };

                const response = await fetch("http://localhost:3001/users/my-events", {
                    method: "GET",
                    headers: {
                        authorization: authorization
                    },
                    credentials: "include"
                });

                const data = await response.json();
                
                if (!response.ok){
                    throw new Error(data.message)
                }

                setResponseData(data.events);
                setResponseError(null);

                let newToken;

                if (data.newAccessToken && data.newAccessToken.length > 1){
                    newToken = data.newAccessToken;
                };

                if (newToken && newToken !== token && newToken !== null) {
                    updateToken(newToken);
                };

            } catch (error) {

                if (error.message.includes("Debe iniciar sesión.")){
                    removeToken();
                };

                setResponseError(error.message);
                setResponseData(null);
            };
        };

        fetchMyEvents();
    }, [ token, removeToken ]);

    return (
        <>
        <main className="flex flex-col justify-center items-center">
            <h2 className="text-center text-5xl p-10">Mis Eventos</h2>
            <ul className="mt-10 flex flex-col justify-center items-center">
                {responseData && responseData.map(event => (
                    <li className="text-xl font-bold mt-5" key={event.id}>{event.name}</li>
                ))}
            </ul>
            <button className="mt-10 bg-black text-xl text-white m-auto rounded-3xl p-5 hover:shadow-custom hover:font-bold"
                onClick={() => {
                    const currentToken = localStorage.getItem("token");
                    setBoton(currentToken);
                }}>
                Printear Cookie</button>
        </main>
        {boton && <p className="text-xl text-green-500 font-bold">{boton}</p>}
        {responseError && <p className="font-bold text-red-500 text-xl text-center">{responseError}</p>}
        </>
    );
};

export default MyEventsPage;