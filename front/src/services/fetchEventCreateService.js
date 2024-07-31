const eventCreateURL = import.meta.env.VITE_API_URL + "/event/create";

const fetchEventCreateService = async (token, formData) => {
    formData.forEach((value, key) => console.log(`${key}:`, value));
    const response = await fetch(eventCreateURL, {
        method: "POST",
        credentials: "include",
        headers: {
            "Authorization": token
        },
        body: formData
    });

    const data = await response.json();

    if (!response.ok){
        throw new Error(data.message);
    };
};

export default fetchEventCreateService;