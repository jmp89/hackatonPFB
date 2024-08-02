import { useState } from "react";
import { useParams } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import fetchInsertEventResults from "../services/fetchInsertEventResults";
import PushNotification from "./PushNotification";

const API_URL = import.meta.env.VITE_API_URL;

const InsertEventResultsComponent = () => {

    const { eventID } = useParams();
    const { token } = useAuth();
    const [ userInputs, setUserInputs ] = useState([{
        user_id: 1,
        points: 1
    }]);

    const handleRenderNewInputs = (e) => {

        e.preventDefault();

        setUserInputs([...userInputs, {user_id: 1, points: 1}])
    };

    const handleChange = (index, e) => {

        const { name, value } = e.target;

        const newInputs = [...userInputs];

        newInputs[index] = {...newInputs[index], [name]: value};

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

    return (

        <form
            onSubmit={handleSubmit} 
            className="mt-10 mx-auto text-lg flex flex-col flex-wrap items-center justify-center gap-4 bg-white px-6 rounded-lg shadow-md w-full max-w-3xl">

            <h2 className="mt-6 mb-2 text-2xl font-bold text-center">Inserción de puntuaciones</h2>

            <section className="w-full flex flex-row gap-4 justify-evenly items-center flex-wrap">

                {userInputs.map((input, index) => (

                    <section key={index} className="w-72 flex flex-col justify-center items-center gap-2 border rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl">

                        <label htmlFor={`user_id_${index}`} className="w-full mt-4 mb-2 ml-4 flex flex-row justify-evenly items-center">
                            ID de usuario
                            <input
                                type="number"
                                name="user_id"
                                id={`user_id_${index}`}
                                min="1"
                                value={input.user_id}
                                onChange={(e) => handleChange(index, e)}
                                className="w-32 mx-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                /></label>

                        <label htmlFor={`points_${index}`} className="w-full mt-4 mb-2 ml-4 flex flex-row justify-evenly items-center">
                            Puntuación
                            <input
                                type="number"
                                name="points"
                                id={`points_${index}`}
                                min="1"
                                max="100"
                                value={input.points}
                                onChange={(e) => handleChange(index, e)}
                                className="w-32 mx-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                /></label>

                        <button
                            onClick={() => handleDelete(index)}
                            className="mb-4 hover:scale-105 transition-transform duration-300"
                            ><img src={API_URL + "/media/delete-icon.svg"} alt="trash-svg" className="h-10 w-10"/>
                        </button>

                    </section>

                ))}

            </section>

            <section className="mt-6 flex flex-col justify-center items-center border rounded-lg w-72 py-4">

                <p>Puntuar más usuarios</p>
                <button
                    onClick={handleRenderNewInputs}
                    className="mt-2 w-44 bg-black text-white py-2 rounded-lg font-bold hover:scale-105 transition-transform duration-300">
                    Añadir</button>

            </section>

            <button className="mt-4 mb-6 w-64 bg-black text-white py-2 rounded-lg font-bold hover:scale-105 transition-transform duration-300">
                Insertar puntuaciones</button>

        </form>
    );
};

export default InsertEventResultsComponent;