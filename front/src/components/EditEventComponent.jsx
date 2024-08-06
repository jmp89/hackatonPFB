import { useEffect, useState, useRef } from 'react';
import { useParams,  useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import fetchThematicsService from '../services/fetchThematicsService';
import fetchTechnologiesService from '../services/fetchTechnologiesService';
import fetchEventEditService from '../services/fetchEventEditService';
import eventDetailsService from '../services/eventDetailsService';
import PushNotification from './PushNotification';

const API_URL = import.meta.env.VITE_API_URL;

const EditEventComponent = () => {
    const { token } = useAuth();
    const { eventID } = useParams();
    const navigate = useNavigate(); // <-- Add this line
    const [thematics, setThematics] = useState([]);
    const [technologies, setTechnologies] = useState([]);
    const [formDataEvent, setFormDataEvent] = useState({
        name: '',
        thematics: [],
        technologies: [],
        online_on_site: null,
        location: '',
        start_date: new Date(),
        finish_date: new Date(),
        start_time: '',
        finish_time: '',
        organizer: '',
        description: '',
    });
    const [formDataEventImage, setFormDataEventImage] = useState(null);
    const [placeholders, setPlaceholders] = useState(null);
    const fileInputRef = useRef(null);

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
                setPlaceholders(eventInfo);
                setFormDataEvent({
                    name: eventInfo.name || '',
                    thematics: eventInfo.thematics ? eventInfo.thematics.map(them => ({ value: them, label: them })) : [],
                    technologies: eventInfo.technologies ? eventInfo.technologies.map(tech => ({ value: tech, label: tech })) : [],
                    online_on_site: eventInfo.online_on_site ? { value: eventInfo.online_on_site, label: eventInfo.online_on_site === 'online' ? 'Online' : 'On Site' } : null,
                    location: eventInfo.location || '',
                    start_date: eventInfo.start_date ? new Date(eventInfo.start_date) : new Date(),
                    finish_date: eventInfo.finish_date ? new Date(eventInfo.finish_date) : new Date(),
                    start_time: eventInfo.start_time || '',
                    finish_time: eventInfo.finish_time || '',
                    organizer: eventInfo.organizer || '',
                    description: eventInfo.description || '',
                });
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
            const separeThems = formDataEvent.thematics.length > 1 ? formDataEvent.thematics[0] : [];
            const separeTechs = formDataEvent.technologies.length > 1 ? formDataEvent.technologies[0] : [];

            const [firstThem, ...restThems] = formDataEvent.thematics;
            const [firstTech, ...restTechs] = formDataEvent.technologies;
            
            let finalThems = [];
            let finalTechs = [];
    
            if (firstThem) {
                finalThems = firstThem.value.split(",").map(them => them.trim());
            }
            if (restThems.length > 0) {
                finalThems = [...finalThems, ...restThems.map(them => them.value)];
            }
    
            if (firstTech) {
                finalTechs = firstTech.value.split(",").map(tech => tech.trim());
            }
            if (restTechs.length > 0) {
                finalTechs = [...finalTechs, ...restTechs.map(tech => tech.value)];
            }

            const formDataFinal = new FormData();
            formDataFinal.append('name', formDataEvent.name);
            formDataFinal.append('thematics', JSON.stringify(finalThems));
            formDataFinal.append('technologies', JSON.stringify(finalTechs));
            formDataFinal.append('online_on_site', formDataEvent.online_on_site ? formDataEvent.online_on_site.value : '');
            formDataFinal.append('location', formDataEvent.location);
            formDataFinal.append('start_date', formDataEvent.start_date.toISOString().split('T')[0]);
            formDataFinal.append('finish_date', formDataEvent.finish_date.toISOString().split('T')[0]);
            formDataFinal.append('start_time', formDataEvent.start_time);
            formDataFinal.append('finish_time', formDataEvent.finish_time);
            formDataFinal.append('organizer', formDataEvent.organizer);
            formDataFinal.append('description', formDataEvent.description);
            formDataFinal.append('fileName', formDataEventImage);

            await fetchEventEditService(token, eventID, formDataFinal);
            PushNotification('Evento actualizado correctamente', { type: 'success' });
            navigate(`/event/details/${eventID}`); // <-- Add this line
        } catch (error) {
            if (error.message.includes('Duplicate entry')) {
                PushNotification('Ya existe un evento con este nombre', { type: 'error' });
            } else {
                PushNotification(error.message, { type: 'error' });
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDataEvent(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSelectChange = (selectedOptions, { name }) => {
        setFormDataEvent(prevState => ({ ...prevState, [name]: selectedOptions }));
    };

    const handleDateChange = (date, name) => {
        setFormDataEvent(prevState => ({ ...prevState, [name]: date }));
    };

    const handleEventImageChange = (e) => {
        setFormDataEventImage(e.target.files[0]);
    };

    const handleFileInputClick = () => {
        fileInputRef.current.click();
    };

    const thematicOptions = thematics.map(them => ({ value: them, label: them }));
    const technologyOptions = technologies.map(tech => ({ value: tech, label: tech }));
    const onlineOnSiteOptions = [
        { value: 'online', label: 'Online' },
        { value: 'on_site', label: 'On Site' },
    ];

    return (
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
                        required
                        placeholder={placeholders?.name}
                        value={formDataEvent.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />

                    <label htmlFor="thematics" className="mt-4 mb-2">
                        Temática/s
                    </label>
                    <Select
                        name="thematics"
                        isMulti
                        options={thematicOptions}
                        value={formDataEvent.thematics}
                        onChange={(options) => handleSelectChange(options, { name: 'thematics' })}
                        className="w-full"
                    />

                    <label htmlFor="technologies" className="mt-4 mb-2">
                        Tecnología/s
                    </label>
                    <Select
                        name="technologies"
                        isMulti
                        options={technologyOptions}
                        value={formDataEvent.technologies}
                        onChange={(options) => handleSelectChange(options, { name: 'technologies' })}
                        className="w-full"
                    />

                    <label htmlFor="online_on_site" className="mt-4 mb-2">
                        Tipo de evento
                    </label>
                    <Select
                        name="online_on_site"
                        options={onlineOnSiteOptions}
                        value={formDataEvent.online_on_site}
                        onChange={(option) => handleSelectChange(option ? [option] : [], { name: 'online_on_site' })}
                        className="w-full"
                    />

                    <label htmlFor="location" className="mt-4 mb-2">
                        Ubicación
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
                    <DatePicker
                        selected={formDataEvent.start_date}
                        onChange={(date) => handleDateChange(date, 'start_date')}
                        dateFormat="yyyy-MM-dd"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />

                    <label htmlFor="finish_date" className="mt-4 mb-2">
                        Fecha de finalización
                    </label>
                    <DatePicker
                        selected={formDataEvent.finish_date}
                        onChange={(date) => handleDateChange(date, 'finish_date')}
                        dateFormat="yyyy-MM-dd"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />

                    <label htmlFor="start_time" className="mt-4 mb-2">
                        Hora de inicio
                    </label>
                    <input
                        type="time"
                        name="start_time"
                        value={formDataEvent.start_time}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />

                    <label htmlFor="finish_time" className="mt-4 mb-2">
                        Hora de finalización
                    </label>
                    <input
                        type="time"
                        name="finish_time"
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
                        name="description"
                        rows="7"
                        placeholder={placeholders?.description}
                        value={formDataEvent.description}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    ></textarea>

                    <section className="mt-4 flex flex-col justify-center items-center">
                        <label htmlFor="fileUpload" className="text-lg mb-2">
                            Imagen del evento
                        </label>

                        <section className="mt-2 mx-auto flex flex-row items-center">
                            <input
                                type="file"
                                name="fileUpload"
                                onChange={handleEventImageChange}
                                ref={fileInputRef}
                                className="hidden"
                            />
                            <button
                                type="button"
                                onClick={handleFileInputClick}
                                className="mr-6 w-11 h-11 hover:scale-105 transition-transform duration-300"
                            >
                                <img
                                    src={`${API_URL}/media/upload.svg`}
                                    alt="upload-file-svg"
                                />
                            </button>

                            {formDataEventImage?.name && (
                                <p className="ml-6 text-lg">{formDataEventImage.name}</p>
                            )}
                        </section>
                    </section>

                    <button
                        type="submit"
                        className="mt-8 mx-auto w-44 bg-black text-white py-2 rounded-lg font-bold text-lg hover:scale-105 transition-transform duration-300"
                    >
                        Guardar cambios
                    </button>
                </section>
            </form>
        </section>
    );
};

export default EditEventComponent;
