const fetchInsertEventResults = async (token, eventID, userInputs) => {

    const API_URL_INSERT_RESULTS = import.meta.env.VITE_API_URL + `/event/insert-results/${eventID}`;
    
    const response = await fetch(API_URL_INSERT_RESULTS, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({ eventInfo: userInputs })
    });
  
    const data = await response.json();

    if (!response.ok){
        throw new Error(data.message);
    };

    return data;
};

export default fetchInsertEventResults;