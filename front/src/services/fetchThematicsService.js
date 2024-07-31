const API_URL_THEMS = import.meta.env.VITE_API_URL + "/event/thematics";

const fetchThematicsService = async () => {

    const response = await fetch(API_URL_THEMS);

    const data = await response.json();

    if (!response.ok){
        throw new Error(data.message);
    };

    const thems = data.data.rows;

    const finalThems = [];
    
    thems.map((them) => finalThems.push(them.name));

    return finalThems;
};

export default fetchThematicsService;