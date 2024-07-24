import { useState, useEffect } from "react";
import fetchEventSearchService from "../services/fetchEventSearchService";

    


const EventSearchForm = () => {

    const [formData, setFormData] = useState({filter:"", sort:"", direction:""})
    const [responseData, setResponseData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {

        const fetchEventSearch = async() => {
            try {
            const response = await fetch("http://localhost:3001/event/search");

            const data = await response.json();

        
           setResponseData(data.data.eventsList);

            } catch(error) {
               setError(error.message);
               setResponseData(null);
            }
        }

        fetchEventSearch();

    }, [])
   

    const handleChange = (e) => {

       const {name, value} = e.target;
       
       setFormData({...formData, [name]:value});

        };

const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        console.log(formData);
        const data = await fetchEventSearchService(formData.filter, formData.sort, formData.direction);


       

        setResponseData(data.data.eventsList);
        setError(null);
        setFormData({filter:"", sort:"", direction:""});
       

    } catch (error){

    setError(error.message);
    setResponseData(null);
}

    };

    return(
        <>
        <form className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mt-10 mx-auto" action="" onSubmit={handleSubmit}>
            <label className="block text-lg font-medium mb-2" htmlFor="">Busqueda evento</label>
            <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" type="text" onChange={handleChange}  name="filter" value={formData.filter}/>
            <label className="block text-lg font-medium mb-2" htmlFor="">Agrupar</label>
            <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" type="text" onChange={handleChange}  name="sort" value={formData.sort}/>
            <label className="block text-lg font-medium mb-2" htmlFor="">Ordenar por</label>
            <label className="block text-lg font-medium mb-2" htmlFor="ordenarasc">asc</label>
            <input className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" type="radio"  onChange={handleChange}  name="direction" id="ordenarasc" value="asc" />
            <label className="block text-lg font-medium mb-2" htmlFor="ordenardesc">desc</label>
            <input className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" type="radio" onChange={handleChange}  name="direction" id="ordenardesc" value="desc" />
            <button className="w-44 bg-black text-white py-2 rounded-lg font-bold text-lg mb-4 hover:scale-105 transition-transform duration-300" >Enviar</button>
        </form>

       {/*} {responseData && <p>{responseData[0].name}</p> }*/}

      {responseData && <ul className="flex flex-col justify-center items-center gap-8 "> {

            responseData.map((event, index) => {

                return (<li key={index} className="w-96 m-4">

                    <article className="flex flex-col justify-start">

                        <p><span className="font-bold">Nombre del evento: </span> {event.name}</p>
                        <p><span className="font-bold">Tecnologia: </span>{event.technologies}</p>
                        <p><span className="font-bold">Tematica: </span>{event.thematics}</p>           
                        <p><span className="font-bold">Remoto / Presencial: </span>{event.online_on_site}</p>
                        <p><span className="font-bold">Ciudad: </span>{event.location}</p>
                        <p><span className="font-bold">Organizador: </span>{event.organizer}</p>
                        <p><span className="font-bold">Fecha de inicio: </span>{event.start_date}</p>
                        <p><span className="font-bold">Fecha de fin: </span>{event.finish_date}</p>
                        <p><span className="font-bold">Hora de inicio: </span>{event.start_time}</p>
                        <p><span className="font-bold">Hora de fin: </span>{event.finish_time}</p>

                    </article>


                </li>)
            })}

        </ul> }

     </>

    );
};

export default EventSearchForm;
