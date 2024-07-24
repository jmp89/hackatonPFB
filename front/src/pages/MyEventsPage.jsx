import { useEffect, useState } from "react";
import {useAuth} from "../context/AuthContext";

const MyEventsPage = () => {

    const { token, removeToken, updateToken, currentUser } = useAuth();

    const [ responseData, setResponseData ] = useState([]);
    const [ responseError, setResponseError ] = useState("");
    const [ boton, setBoton ] = useState();

    // useEffect(() => {

    //     const fetchMyEvents = async () => {

    //         try {

    //             const authorization = token;
        
    //             if (!authorization){
    //                 throw new Error("Debe iniciar sesión.");
    //             };

    //             const response = await fetch("http://localhost:3001/users/my-events", {
    //                 method: "GET",
    //                 headers: {
    //                     authorization: authorization
    //                 },
    //                 credentials: "include"
    //             });

    //             const data = await response.json();
                
    //             if (!response.ok){
    //                 throw new Error(data.message)
    //             }

    //             setResponseData(data.events);
    //             setResponseError(null);

    //             let newToken;

    //             if (data.newAccessToken && data.newAccessToken.length > 1){
    //                 newToken = data.newAccessToken;
    //             };

    //             if (newToken && newToken !== token && newToken !== null) {
    //                 updateToken(newToken);
    //             };

    //         } catch (error) {

    //             if (error.message.includes("Debe iniciar sesión.")){
    //                 removeToken();
    //             };

    //             setResponseError(error.message);
    //             setResponseData(null);
    //         };
    //     };

    //     fetchMyEvents();
    // }, [ token, removeToken ]);

    const patata = JSON.parse(currentUser);

    return (
        <>
            {/* {token && <p>{token}</p>} */}
            {/* {!token && <p>No hay token</p>} */}
            {currentUser && <p>{currentUser}</p>}
            {patata && <p>{patata.name}, {patata.email}</p>}
        </>
    );
};

export default MyEventsPage;