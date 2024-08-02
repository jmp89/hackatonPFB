const fetchEventEditService = async (token, eventID, formData) => {
    const editEventUrl = `${
        import.meta.env.VITE_API_URL
    }/event/edit/${eventID}`;

    const response = await fetch(editEventUrl, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            Authorization: token,
        },
        body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Error al editar el evento');
    }
};

export default fetchEventEditService;
