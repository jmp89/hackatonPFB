
const fetchParticipantsService = async (eventID) => {

    const API_URL_PARTICIPANTS = import.meta.env.VITE_API_URL + "/event/participants/" + eventID;

    const response = await fetch(API_URL_PARTICIPANTS);

    const data = await response.json();

    if (!response.ok){
        throw new Error(data.message);
    };

    return data.participants;
};

export default fetchParticipantsService;