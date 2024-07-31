const fetchChangeAvatarService = async (
    API_URL_FOR_AVATAR,
    token,
    updatedFormDataAvatar
) => {

    const response = await fetch(API_URL_FOR_AVATAR, {
        method: "POST",
        credentials: "include",
        headers: {
            "Authorization": token
        },
        body: updatedFormDataAvatar
    });

    const data = await response.json();

    if (!response.ok){
        throw new Error(data.message);
    };

    return data;
};

export default fetchChangeAvatarService;