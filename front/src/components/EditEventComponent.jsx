import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import fetchThematicsService from '../services/fetchThematicsService';
import fetchTechnologiesService from '../services/fetchTechnologiesService';
import fetchEventEditService from '../services/fetchEventEditService';
import eventDetailsService from '../services/eventDetailsService';
import PushNotification from './PushNotification';

const API_URL = import.meta.env.VITE_API_URL;

const EditEventComponent = () => {
    const { token } = useAuth();
    const [thematics, setThematics] = useState([]);
    const [technologies, setTechnologies] = useState([]);
    const [formDataEvent, setFormDataEvent] = useState({
        name: '',
        thematics: [],
        technologies: [],
        online_on_site: '',
        location: '',
        start_date: '',
        finish_date: '',
        start_time: '',
        finish_time: '',
        organizer: '',
        description: '',
    });
    const [formDataEventImage, setFormDataEventImage] = useState(null);
    const [placeholders, setPlaceholders] = useState(null);

    const fileInputRef = useRef(null);

    const { eventID } = useParams();

    const validThems = [
        'Coding Race',
        'Top Developers',
        'AI Development',
        'API Development',
        'Machine Learning',
        'Data Science',
        'Cybersecurity',
        'Web Development',
        'Mobile App Development',
        'Blockchain',
        'Cloud Computing',
        'IoT',
        'Robotics',
        'Game Development',
        'Gaming',
        'Healthcare Technology',
    ];
    const validTechs = [
        'Python',
        'JavaScript',
        'React',
        'NextJS',
        'NodeJS',
        'Java',
        'C#',
        'Ruby',
        'PHP',
        'Swift',
        'Kotlin',
        'HTML/CSS',
        'TypeScript',
        'Angular',
        'VueJS',
        'Flutter',
        'Django',
        'Flask',
        'Spring Boot',
        'TensorFlow',
        'PyTorch',
        'Docker',
        'Kubernetes',
        'AWS',
        'Azure',
        'Google Cloud',
        'PostgreSQL',
        'MySQL',
        'MongoDB',
        'GraphQL',
        'Solidity',
        'Rust',
    ];

    useEffect(() => {
        const getThems = async () => {
            try {
                const thems = await fetchThematicsService();

                setThematics(thems);
            } catch (error) {
                PushNotification(error.message, { type: 'error' });
            }
        };

        const getTechs = async () => {
            try {
                const techs = await fetchTechnologiesService();

                setTechnologies(techs);
            } catch (error) {
                PushNotification(error.message, { type: 'error' });
            }
        };

        const getEventInfo = async () => {
            try {
                const eventInfo = await eventDetailsService(eventID);
                console.log('eventINFO: ', eventInfo);
                setPlaceholders(eventInfo);
            } catch (error) {
                PushNotification(error.message, { type: 'error' });
            }
        };

        getThems();
        getTechs();
        getEventInfo();
    }, [eventID]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedFormDataEvent = {
                name:
                    formDataEvent.name.length > 0
                        ? formDataEvent.name
                        : placeholders.name,
                thematics:
                    formDataEvent.thematics.length > 0
                        ? formDataEvent.thematics
                        : placeholders.thematics.reduce((x, y) => x + y, ''),
                technologies:
                    formDataEvent.technologies.length > 0
                        ? formDataEvent.technologies
                        : placeholders.technologies.reduce((x, y) => x + y, ''),
                online_on_site:
                    formDataEvent.online_on_site.length > 0
                        ? formDataEvent.online_on_site
                        : placeholders.online_on_site,
                location:
                    formDataEvent.location.length > 0
                        ? formDataEvent.location
                        : placeholders.location,
                start_date:
                    formDataEvent.start_date.length > 0
                        ? formDataEvent.start_date
                        : placeholders.start_date,
                finish_date:
                    formDataEvent.finish_date.length > 0
                        ? formDataEvent.finish_date
                        : placeholders.finish_date,
                start_time:
                    formDataEvent.start_time.length > 0
                        ? formDataEvent.start_time
                        : placeholders.start_time,
                finish_time:
                    formDataEvent.finish_time.length > 0
                        ? formDataEvent.finish_time
                        : placeholders.finish_time,
                organizer:
                    formDataEvent.organizer.length > 0
                        ? formDataEvent.organizer
                        : placeholders.organizer,
                description:
                    formDataEvent.description.length > 0
                        ? formDataEvent.description
                        : placeholders.description,
            };

            const themsArray = updatedFormDataEvent.thematics
                .split(',')
                .map((them) => them.trim());
            const techsArray = updatedFormDataEvent.technologies
                .split(',')
                .map((tech) => tech.trim());

            themsArray.forEach((them) => {
                if (!validThems.includes(them)) {
                    throw new Error('Temática desconocida');
                }
            });

            techsArray.forEach((tech) => {
                if (!validTechs.includes(tech)) {
                    throw new Error('Tecnología desconocida');
                }
            });

            const formDataFinal = new FormData();

            formDataFinal.append('name', updatedFormDataEvent.name);
            formDataFinal.append('thematics', JSON.stringify(themsArray));
            formDataFinal.append('technologies', JSON.stringify(techsArray));
            formDataFinal.append(
                'online_on_site',
                updatedFormDataEvent.online_on_site
            );
            formDataFinal.append('location', updatedFormDataEvent.location);
            formDataFinal.append(
                'start_date',
                updatedFormDataEvent.start_date.slice(0, 10)
            );
            formDataFinal.append(
                'finish_date',
                updatedFormDataEvent.finish_date.slice(0, 10)
            );
            formDataFinal.append('start_time', updatedFormDataEvent.start_time);
            formDataFinal.append(
                'finish_time',
                updatedFormDataEvent.finish_time
            );
            formDataFinal.append('organizer', updatedFormDataEvent.organizer);
            formDataFinal.append(
                'description',
                updatedFormDataEvent.description
            );
            formDataFinal.append('fileName', formDataEventImage);

            await fetchEventEditService(token, eventID, formDataFinal);

            PushNotification('Evento actualizado correctamente', {
                type: 'success',
            });
        } catch (error) {
            if (error.message.includes('Duplicate entry')) {
                PushNotification('Ya existe un evento con este nombre', {
                    type: 'error',
                });
            } else {
                PushNotification(error.message, { type: 'error' });
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormDataEvent({ ...formDataEvent, [name]: value });
    };

    const handleEventImageChange = (e) => {
        setFormDataEventImage(e.target.files[0]);
    };

    const handleFileInputClick = () => {
        fileInputRef.current.click();
    };

    return (
        <>
            <section className="text-lg">
                <form
                    className="mt-10 mx-auto flex flex-col bg-white px-6 rounded-t-lg shadow-md w-full max-w-3xl"
                    onSubmit={handleSubmit}
                >
                    <h2 className="mt-6 text-2xl font-bold text-center">
                        Modificación de eventos
                    </h2>

                    <section className="m-6 mb-10 flex flex-col">
                        <label htmlFor="name" className="mt-4 mb-2">
                            Nombre
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder={placeholders?.name}
                            value={formDataEvent.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />

                        <label htmlFor="thematics" className="mt-4 mb-2">
                            Temática/s{' '}
                        </label>
                        <section>
                            <input
                                type="text"
                                name="thematics"
                                placeholder={placeholders?.thematics.join(', ')}
                                value={formDataEvent.thematics}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <textarea
                                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                name="technologies"
                                value={thematics.join(', \n')}
                                rows="7"
                                disabled
                            ></textarea>
                        </section>

                        <label htmlFor="technologies" className="mt-4 mb-2">
                            Tecnología/s
                        </label>
                        <section>
                            <input
                                type="text"
                                name="technologies"
                                placeholder={placeholders?.technologies}
                                value={formDataEvent.technologies}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                            <textarea
                                className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                name="technologies"
                                value={technologies.join(', \n')}
                                rows="7"
                                disabled
                            ></textarea>
                        </section>

                        <label htmlFor="online_on_site" className="mt-4 mb-2">
                            Online - Presencial
                        </label>
                        <input
                            type="text"
                            name="online_on_site"
                            placeholder={placeholders?.online_on_site}
                            value={formDataEvent.online_on_site}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />

                        <label htmlFor="location" className="mt-4 mb-2">
                            Tendrá lugar en
                        </label>
                        <input
                            type="text"
                            name="location"
                            placeholder={placeholders?.location}
                            value={formDataEvent.location}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />

                        <label htmlFor="start_date" className="mt-4 mb-2">
                            Fecha de inicio
                        </label>
                        <input
                            type="text"
                            name="start_date"
                            placeholder={placeholders?.start_date.slice(0, 10)}
                            value={formDataEvent.start_date}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />

                        <label htmlFor="finish_date" className="mt-4 mb-2">
                            Fecha de finalización
                        </label>
                        <input
                            type="text"
                            name="finish_date"
                            placeholder={placeholders?.finish_date.slice(0, 10)}
                            value={formDataEvent.finish_date}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />

                        <label htmlFor="start_time" className="mt-4 mb-2">
                            Hora de inicio
                        </label>
                        <input
                            type="text"
                            name="start_time"
                            placeholder={placeholders?.start_time}
                            value={formDataEvent.start_time}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />

                        <label htmlFor="finish_time" className="mt-4 mb-2">
                            Hora de finalización
                        </label>
                        <input
                            type="text"
                            name="finish_time"
                            placeholder={placeholders?.finish_time}
                            value={formDataEvent.finish_time}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />

                        <label htmlFor="organizer" className="mt-4 mb-2">
                            Organizador
                        </label>
                        <input
                            type="text"
                            name="organizer"
                            placeholder={placeholders?.organizer}
                            value={formDataEvent.organizer}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />

                        <label htmlFor="description" className="mt-4 mb-2">
                            Descripción
                        </label>
                        <textarea
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black mb-2"
                            name="description"
                            placeholder={placeholders?.description}
                            value={formDataEvent.description}
                            onChange={handleChange}
                            rows="10"
                        />

                        <section className="mt-4 flex flex-col justify-center items-center">
                            <label
                                htmlFor="fileUpload"
                                className="text-lg mb-2"
                            >
                                Seleccione la imagen del evento
                            </label>

                            <section className="mt-2 mx-auto flex flex-row items-center">
                                <input
                                    type="file"
                                    name="fileUpload"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={handleEventImageChange}
                                />
                                <button
                                    type="button"
                                    className="mr-6 w-11 h-11 hover:scale-105 transition-transform duration-300"
                                    onClick={handleFileInputClick}
                                >
                                    <img
                                        src={`${API_URL}/media/upload.svg`}
                                        alt="upload-file-svg"
                                    />
                                </button>

                                {formDataEventImage?.name && (
                                    <p className="ml-6 text-lg">
                                        {formDataEventImage.name}
                                    </p>
                                )}
                            </section>
                        </section>

                        <button className="mt-8 mx-auto w-44 bg-black text-white py-2 rounded-lg font-bold text-lg hover:scale-105 transition-transform duration-300">
                            Editar evento
                        </button>
                    </section>
                </form>
            </section>
        </>
    );
};

export default EditEventComponent;
