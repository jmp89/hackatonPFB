import { useState, useEffect } from 'react';
import fetchEventSearchService from '../services/fetchEventSearchService';
import PushNotification from './PushNotification.jsx';
import { Navigate, Link } from 'react-router-dom';

const EventSearchForm = () => {
    const [formData, setFormData] = useState({
        filter: '',
        sort: '',
        direction: '',
    });
    const [responseData, setResponseData] = useState(null);

    useEffect(() => {
        const fetchEventSearch = async () => {
            try {
                const response = await fetch(
                    import.meta.env.VITE_API_URL + '/event/search'
                );

                const data = await response.json();

                setResponseData(data.data.eventsList);
            } catch (error) {
                setResponseData(null);
                PushNotification(error.message, { type: 'error' });
            }
        };

        fetchEventSearch();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await fetchEventSearchService(
                formData.filter,
                formData.sort,
                formData.direction
            );
            setResponseData(data.data.eventsList);
            setFormData({ filter: '', sort: '', direction: '' });
        } catch (error) {
            setResponseData(null);
            PushNotification(error.message, { type: 'error' });
        }
    };
    const handleEventClick = (eventId) => {
        return <Navigate to={`/event/details/${eventId}`} />;
    };
    return (
        <>
            <form
                className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mt-10 mx-auto"
                onSubmit={handleSubmit}
            >
                <label
                    className="block text-lg font-medium mb-2"
                    htmlFor="filter"
                >
                    Búsqueda de evento
                </label>
                <input
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    type="text"
                    onChange={handleChange}
                    name="filter"
                    id="filter"
                    value={formData.filter}
                />

                <label
                    className="mt-2 block text-lg font-medium mb-2"
                    htmlFor="sort"
                >
                    Agrupar por
                </label>
                <select
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    onChange={handleChange}
                    name="sort"
                    id="sort"
                    value={formData.sort}
                >
                    <option value="">Seleccione una opción</option>
                    <option value="name">Nombre</option>
                    <option value="technologies">Tecnología</option>
                    <option value="thematics">Temática</option>
                    <option value="online_on_site">
                        Modalidad - Remoto / Presencial
                    </option>
                    <option value="location">Ciudad</option>
                    <option value="start_date">Fecha de inicio</option>
                    <option value="finish_date">Fecha de finalización</option>
                </select>

                <label
                    className="mt-2 block text-lg font-medium mb-2"
                    htmlFor="direction"
                >
                    Ordenar por
                </label>
                <select
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    onChange={handleChange}
                    name="direction"
                    id="direction"
                    value={formData.direction}
                >
                    <option value="">Seleccione una opción</option>
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                </select>

                <button className="mt-4 w-44 bg-black text-white py-2 rounded-lg font-bold text-lg mb-2 hover:scale-105 transition-transform duration-300">
                    Enviar
                </button>
            </form>

            {responseData && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 w-full max-w-7xl mx-auto">
                    {responseData.map((event, index) => {
                        const isFinished =
                            new Date(event.finish_date) < new Date();

                        return (
                            <li
                                key={index}
                                className="flex flex-col sm:flex-row border rounded-lg shadow-md hover:scale-105 transition-all duration-300 transform cursor-pointer"
                            >
                                <article
                                    className="flex flex-col sm:flex-row items-center"
                                    onClick={() => handleEventClick(event.id)}
                                >
                                    <Link
                                        to={`/event/details/${event.id}`}
                                        className="flex flex-col sm:flex-row items-center no-underline text-black"
                                    >
                                        <div className="w-full sm:w-2/3 p-2 flex justify-center">
                                            <img
                                                src={
                                                    import.meta.env
                                                        .VITE_API_URL +
                                                        event.image ||
                                                    import.meta.env
                                                        .VITE_API_URL +
                                                        '/uploads/event1.jpg'
                                                }
                                                alt="Imagen del evento"
                                                className="w-full max-w-64 h-full object-cover rounded-lg"
                                            />
                                        </div>

                                        <div className="flex flex-col p-4 sm:w-full">
                                            <p>
                                                <span className="font-bold">
                                                    Nombre del evento:
                                                </span>{' '}
                                                {event.name}
                                            </p>
                                            <p>
                                                <span className="font-bold">
                                                    Tecnología:
                                                </span>{' '}
                                                {event.technologies.join(', ')}
                                            </p>
                                            <p>
                                                <span className="font-bold">
                                                    Temática:
                                                </span>{' '}
                                                {event.thematics.join(', ')}
                                            </p>
                                            <p>
                                                <span className="font-bold">
                                                    Remoto / Presencial:
                                                </span>{' '}
                                                {event.online_on_site ===
                                                'online'
                                                    ? 'Remoto'
                                                    : 'Presencial'}
                                            </p>
                                            <p>
                                                <span className="font-bold">
                                                    Tendrá lugar en:
                                                </span>{' '}
                                                {event.location}
                                            </p>
                                            <p>
                                                <span className="font-bold">
                                                    Inicio / Fin:
                                                </span>{' '}
                                                {event.start_date.slice(0, 10)}{' '}
                                                /{' '}
                                                {event.finish_date.slice(0, 10)}
                                            </p>
                                            {isFinished && (
                                                <p className="text-red-700 font-bold text-center">
                                                    Evento finalizado
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                </article>
                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
};

export default EventSearchForm;
