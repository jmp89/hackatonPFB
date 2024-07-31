const fetchChangePasswordService = async (
    API_URL_FOR_PASSWORD,
    token,
    updatedFormDataPassword
) => {

    const response = await fetch(API_URL_FOR_PASSWORD, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(updatedFormDataPassword)
    });

    const data = await response.json();

    if (!response.ok){
        throw new Error(data.message);
    };

    return data;
};

export default fetchChangePasswordService;