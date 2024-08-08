import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import fetchInsertEventResults from "../services/fetchInsertEventResults";
import fetchParticipantsService from "../services/fetchParticipantsService";
import PushNotification from "./PushNotification";

const API_URL = import.meta.env.VITE_API_URL;

const InsertEventResultsComponent = () => {
    const { eventID } = useParams();
    const { token } = useAuth();
    const [ userInputs, setUserInputs ] = useState([]);
    const [ participants, setParticipants ] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const participantsPerPage = 6;

    useEffect(() => {

        const getParticipants = async () => {

            try {
                
                const participantsList = await fetchParticipantsService(eventID);

                setParticipants(participantsList);

            } catch (error) {
                
                PushNotification(error.message, { type: "error" });

            };
        };
        
        getParticipants();

    },[eventID]);

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const newInputs = [...userInputs];
        newInputs[index] = { ...newInputs[index], [name]: value };
        setUserInputs(newInputs);
    };

    const handleDelete = (index) => {
        const newInputs = userInputs.filter((input, i) => i !== index);
        setUserInputs(newInputs);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await fetchInsertEventResults(token, eventID, userInputs);
            PushNotification(data.message, { type: "success" });
        } catch (error) {
            PushNotification(error.message, { type: "error" });
        };
    };

    const handleAddUser = (username, user_id) => {
        setUserInputs([...userInputs, { username, user_id, points: 1 }]);
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(participants.length / participantsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const indexOfLastParticipant = currentPage * participantsPerPage;
    const indexOfFirstParticipant = indexOfLastParticipant - participantsPerPage;
    const currentParticipants = participants.slice(indexOfFirstParticipant, indexOfLastParticipant);

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-10 mx-auto text-lg flex flex-col flex-wrap items-center justify-center gap-4 bg-white px-6 rounded-lg shadow-md w-full max-w-3xl"
        >
            <h2 className="mt-6 mb-2 text-2xl font-bold text-center">Puntuar eventos finalizados</h2>

            <section className="relative w-full flex flex-col justify-center items-center">

                <p className="mt-2 mb-6">Evento: <span className="font-bold">{participants[0]?.name}</span></p>

                <section>
                    <ul className="min-h-64 max-h-custom flex flex-row flex-wrap justify-center items-center gap-4">
                        {currentParticipants.map((participant) => (
                            <li key={participant.id}
                                className="px-2 h-16 mb-4 flex flex-row justify-start items-center border rounded-lg shadow-md text-center overflow-hidden w-64 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl"
                                onClick={() => handleAddUser(participant.username, participant.id)}>
                                    <img src={API_URL + participant.avatar} alt="user-avatar"
                                    className="w-10 mr-2" />
                                    {participant.username}</li>
                        ))}
                    </ul>
                </section>

                <section className="flex flex-row justify-center items-center mt-4 w-full">
                    {currentPage > 1 && (
                        <button
                            type="button"
                            onClick={handlePreviousPage}
                            className="md:absolute top-40 left-2 px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
                            disabled={currentPage === 1}
                            >
                            <img src={API_URL + "/media/back-next-arrow.svg"} alt="back-arrow-svg" className="w-10" />
                        </button>
                    )}
                    {currentPage < Math.ceil(participants.length / participantsPerPage) && (
                    <button
                        type="button"
                        onClick={handleNextPage}
                        className="md:absolute top-40 right-4 px-4 py-2 rounded-lg transition-transform transform hover:scale-105 rotate-180"
                        disabled={currentPage === Math.ceil(participants.length / participantsPerPage)}
                    >
                        <img src={API_URL + "/media/back-next-arrow.svg"} alt="next-arrow-svg" className="w-10" />
                    </button>
                    )}
                </section>

            </section>

            <section className="w-full flex flex-row gap-4 justify-evenly items-center flex-wrap">
                {userInputs.map((input, index) => (
                    <section
                        key={index}
                        className="w-80 flex flex-col justify-center items-center border rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl"
                    >
                        <label htmlFor={`username_${index}`} className="w-full mt-4 mb-2 ml-4 flex flex-row justify-between items-center">
                            Usuario
                            <input
                                type="text"
                                name="username"
                                id={`username_${index}`}
                                value={input.username}
                                onChange={(e) => handleChange(index, e)}
                                className="w-52 mx-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                readOnly
                            />
                        </label>

                        <label htmlFor={`points_${index}`} className="w-full mt-4 mb-2 ml-4 flex flex-row justify-between items-center">
                            ID
                            <input
                                type="number"
                                name="user_id"
                                readOnly
                                id={`points_${index}`}
                                value={input.user_id}
                                onChange={(e) => handleChange(index, e)}
                                className="w-32 mx-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </label>

                        <label htmlFor={`points_${index}`} className="w-full mt-4 mb-2 ml-4 flex flex-row justify-between items-center">
                            Puntuación
                            <input
                                type="number"
                                name="points"
                                id={`points_${index}`}
                                min="1"
                                max="100"
                                value={input.points}
                                onChange={(e) => handleChange(index, e)}
                                className="w-32 mx-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </label>

                        <section>
                            <button
                                onClick={() => handleDelete(index)}
                                className="mb-4 hover:scale-105 transition-transform duration-300"
                            >
                                <img src={API_URL + "/media/delete-icon.svg"} alt="trash-svg" className="mt-4 h-10 w-10" />
                            </button>
                        </section>
                    </section>
                ))}
            </section>

            <button className="mt-4 w-64 bg-black text-white py-2 rounded-lg font-bold hover:scale-105 transition-transform duration-300">
                Insertar puntuaciones
            </button>

            <Link
                to={`/event/details/${eventID}`}
                className="mt-4 mb-6 w-44 bg-black text-white py-2 rounded-lg font-bold text-center hover:scale-105 transition-transform duration-300"
            >
                Volver
            </Link>
        </form>
    );
};

export default InsertEventResultsComponent;
// h-custom md:h-64