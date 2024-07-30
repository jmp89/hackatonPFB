const API_URL = import.meta.env.VITE_API_URL + "/users/my-inscriptions";

const fetchMyInscriptionsService = async (token) => {

    const response = await fetch(API_URL, {
        method: "GET",
        credentials: "include",
        headers: {
            "Authorization": token
        }
    });

    const data = await response.json();

    if (!response.ok){
        throw new Error(data.message);
    }

    return data.events;
};

export default fetchMyInscriptionsService;