const fetchUserLoginService = async (email, password, setError, setLoginOk) => {

    const URL_LOGIN = import.meta.env.VITE_API_URL + "/users/login";

    const response = await fetch(URL_LOGIN, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    });

    const data = await response.json();
        
    if (!response.ok){
        throw new Error(data.message);
    };

    return data.token;
};

export default fetchUserLoginService;