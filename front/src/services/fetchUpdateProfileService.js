const fetchUpdateProfileService = async (
    API_URL_FOR_PROFILE,
    token,
    updatedFormDataProfile
) => {

    const response = await fetch(API_URL_FOR_PROFILE, {
        method: "PUT",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        },
        body: JSON.stringify(updatedFormDataProfile)
    });

    const data = await response.json();

    if (!response.ok){
        throw new Error(data.message);
    };

    return data;
};

export default fetchUpdateProfileService;