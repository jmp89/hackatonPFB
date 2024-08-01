import { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import fetchThematicsService from "../services/fetchThematicsService";
import fetchTechnologiesService from "../services/fetchTechnologiesService";
import fetchEventCreateService from "../services/fetchEventCreateService";
import PushNotification from "./PushNotification";

const API_URL = import.meta.env.VITE_API_URL;

const CreateEventComponent = () => {

    const { token } = useAuth();
    const [ thematics, setThematics ] = useState([]);
    const [ technologies, setTechnologies ] = useState([]);
    const [ formDataEvent, setFormDataEvent ] = useState({
        name: "",
        thematics: [],
        technologies: [],
        online_on_site: "",
        location: "",
        start_date: "",
        finish_date: "",
        start_time: "",
        finish_time: "",
        organizer: "",
        description: ""
    });
    const [ formDataEventImage, setFormDataEventImage ] = useState(null);
    const fileInputRef = useRef(null);

    const validThems = [
        "Coding Race",
        "Top Developers",
        "AI Development",
        "API Development",
        "Machine Learning",
        "Data Science",
        "Cybersecurity",
        "Web Development",
        "Mobile App Development",
        "Blockchain",
        "Cloud Computing",
        "IoT",
        "Robotics",
        "Game Development",
        "Gaming",
        "Healthcare Technology"
    ];
    const validTechs = [
        "Python",
        "JavaScript",
        "React",
        "NextJS",
        "NodeJS",
        "Java",
        "C#",
        "Ruby",
        "PHP",
        "Swift",
        "Kotlin",
        "HTML/CSS",
        "TypeScript",
        "Angular",
        "VueJS",
        "Flutter",
        "Django",
        "Flask",
        "Spring Boot",
        "TensorFlow",
        "PyTorch",
        "Docker",
        "Kubernetes",
        "AWS",
        "Azure",
        "Google Cloud",
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "GraphQL",
        "Solidity",
        "Rust"
    ];


    useEffect(() => {

        const getThems = async () => {
            
            try {

                const thems = await fetchThematicsService();

                setThematics(thems);
                
            } catch (error) {
                
                PushNotification(error.message, { type: "error" });
            };
        };

        const getTechs = async () => {
            
            try {

                const techs = await fetchTechnologiesService();

                setTechnologies(techs);
                
            } catch (error) {
                
                PushNotification(error.message, { type: "error" });
            };
        };

        getThems();
        getTechs();

    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const themsArray = formDataEvent.thematics.split(",").map((them) => them.trim());
            const techsArray = formDataEvent.technologies.split(",").map((tech) => tech.trim());

            themsArray.forEach((them) => {

                if(!validThems.includes(them)){

                    throw new Error("Temática desconocida");
                };
            });

            techsArray.forEach((tech) => {

                if(!validTechs.includes(tech)){

                    throw new Error("Tecnología desconocida");
                };
            });

            if (!formDataEventImage) {
                throw new Error("Es necesario subir una imagen para crear el evento");
            };

            const formDataGeneral = new FormData();

            formDataGeneral.append("name", formDataEvent.name);
            formDataGeneral.append("thematics", JSON.stringify(themsArray));
            formDataGeneral.append("technologies", JSON.stringify(techsArray));
            formDataGeneral.append("online_on_site", formDataEvent.online_on_site);
            formDataGeneral.append("location", formDataEvent.location);
            formDataGeneral.append("start_date", formDataEvent.start_date);
            formDataGeneral.append("finish_date", formDataEvent.finish_date);
            formDataGeneral.append("start_time", formDataEvent.start_time);
            formDataGeneral.append("finish_time", formDataEvent.finish_time);
            formDataGeneral.append("organizer", formDataEvent.organizer);
            formDataGeneral.append("description", formDataEvent.description);
            formDataGeneral.append("fileName", formDataEventImage);

            await fetchEventCreateService(token, formDataGeneral);

            PushNotification("Evento creado correctamente", { type: "success" });

        } catch (error) {
            
            if(error.message.includes("Duplicate entry")){
                PushNotification("Ya existe un evento con este nombre", { type: "error" })
            } else {
                PushNotification(error.message, { type: "error" })
            };
        };

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormDataEvent({...formDataEvent, [name]: value});
    };

    const handleEventImageChange = (e) => {

        setFormDataEventImage(e.target.files[0]);
    };

    const handleFileInputClick = () => {

        fileInputRef.current.click();
    };

    return (
        <>
            <main className="text-lg">

                <form className="mt-10 mx-auto flex flex-col bg-white px-6 rounded-t-lg shadow-md w-full max-w-3xl"
                    onSubmit={handleSubmit}>

                    <h2 className="mt-6 text-2xl font-bold text-center ">Creación de eventos</h2>

                    <section className="m-6 mb-10 flex flex-col">

                        <label htmlFor="name" className="mt-4 mb-2">
                            Nombre</label>
                        <input type="text" name="name" required value={formDataEvent.name} onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />

                        <label htmlFor="thematics" className="mt-4 mb-2">
                                Temática/s </label>
                        <section>
                            <input type="text" name="thematics" required placeholder="varias temáticas separadas por ', '"
                                 value={formDataEvent.thematics} onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />
                            <textarea className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                name="technologies" value={thematics.join(", \n")} rows="7" disabled></textarea>
                        </section>

                        <label htmlFor="technologies" className="mt-4 mb-2">
                                Tecnología/s</label>
                        <section>
                            <input type="text" name="technologies" required placeholder="varias tecnologías separadas por ', '"
                                value={formDataEvent.technologies} onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />
                            <textarea className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                name="technologies" value={technologies.join(", \n")} rows="7" disabled></textarea>
                        </section>

                        <label htmlFor="online_on_site" className="mt-4 mb-2">
                            Online - Presencial</label>
                        <input type="text" name="online_on_site" required value={formDataEvent.online_on_site} onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />

                        <label htmlFor="location" className="mt-4 mb-2">
                            Tendrá lugar en</label>
                        <input type="text" name="location" required value={formDataEvent.location} onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />

                        <label htmlFor="start_date" className="mt-4 mb-2">
                            Fecha de inicio</label>
                        <input type="text" name="start_date" required value={formDataEvent.start_date} onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />

                        <label htmlFor="finish_date" className="mt-4 mb-2">
                            Fecha de finalización</label>
                        <input type="text" name="finish_date" required value={formDataEvent.finish_date} onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />

                        <label htmlFor="start_time" className="mt-4 mb-2">
                            Hora de inicio</label>
                        <input type="text" name="start_time" required value={formDataEvent.start_time} onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />

                        <label htmlFor="finish_time" className="mt-4 mb-2">
                            Hora de finalización</label>
                        <input type="text" name="finish_time" required value={formDataEvent.finish_time} onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />

                        <label htmlFor="organizer" className="mt-4 mb-2">
                            Organizador</label>
                        <input type="text" name="organizer" required value={formDataEvent.organizer} onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />

                        <label htmlFor="description" className="mt-4 mb-2">
                            Descripción</label>
                        <textarea className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black mb-2"    
                            name="description" required value={formDataEvent.description} onChange={handleChange} rows="10" />

                        <section className="mt-4 flex flex-col justify-center items-center">
                        
                            <label htmlFor="fileUpload" className="text-lg mb-2">
                                Seleccione la imagen del evento</label>

                            <section className="mt-2 mx-auto flex flex-row items-center">

                                <input type="file" name="fileUpload" className="hidden"
                                    ref={fileInputRef} onChange={handleEventImageChange} />
                                <button type="button" className="mr-6 w-11 h-11 hover:scale-105 transition-transform duration-300"
                                    onClick={handleFileInputClick}>
                                    <img src={`${API_URL}/media/upload.svg`} alt="upload-file-svg" />
                                </button>

                                {formDataEventImage?.name && <p className="ml-6 text-lg">{formDataEventImage.name}</p>}

                            </section>

                        </section>

                        <button className="mt-8 mx-auto w-44 bg-black text-white py-2 rounded-lg font-bold text-lg hover:scale-105 transition-transform duration-300">Crear Evento</button>

                    </section>

                </form>

            </main>
        </>
    );
};

export default CreateEventComponent;