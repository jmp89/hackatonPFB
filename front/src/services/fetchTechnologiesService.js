const API_URL_TECHS = import.meta.env.VITE_API_URL + "/event/technologies";

const fetchTechnologiesService = async () => {

    const response = await fetch(API_URL_TECHS);

    const data = await response.json();

    if (!response.ok){
        throw new Error(data.message);
    };

    const techs = [];
    
    data.map((tech) => techs.push(tech.name));

    return techs;
};

export default fetchTechnologiesService;