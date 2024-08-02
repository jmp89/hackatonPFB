const API_URL_EVENT_RESULTS = import.meta.env.VITE_API_URL + "/event/results";

const fetchEventsResultsService = async () => {

    const response = await fetch(API_URL_EVENT_RESULTS);

    const data = await response.json();

    if (!response.ok){
        throw new Error(data.message);
    };
    console.log(data);
    return data.data.finishedEvents;
};

export default fetchEventsResultsService;