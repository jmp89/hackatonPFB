const fetchEventSearchService = async (filter, sort, direction ) => {

    const URL_EVENT = import.meta.env.VITE_API_URL + "/event/search" + `?filter=${filter}` + `&sort=${sort}` + `&direction=${direction}`;

    const response = await fetch(URL_EVENT);
       
    
        const data = await response.json();
       // console.log(data);
        if (!response.ok){

        throw new Error(data.message);
        }

    return data;
};

export default fetchEventSearchService;