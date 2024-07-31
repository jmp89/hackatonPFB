import { useState, useRef } from "react";
import fetchChangeAvatarService from "../../services/fetchChangeAvatar"

const API_URL = import.meta.env.VITE_API_URL;
const API_URL_FOR_AVATAR = API_URL + "/upload"

const ProfileAvatarComponent = ({
    token,
    currentUser,
    updateCurrentUser,
    placeholders,
    editingAvatar,
    setEditingAvatar,
    setEditingProfile,
    setEditingPassword,
    PushNotification
}) => {

    const [ formDataAvatar, setFormDataAvatar ] = useState(null);
    const fileInputRef = useRef(null);

    const avatar = placeholders.avatar.length < 1 ? "/media/userProfile.svg" : placeholders.avatar;

    const handleAvatarSubmit = async (e) => {

        e.preventDefault();

        try {

            if (!formDataAvatar){
                PushNotification("Por favor, seleccione un nuevo avatar", { type: "error"});
                return;
            };

            const updatedFormDataAvatar = new FormData();
            updatedFormDataAvatar.append('fileName', formDataAvatar);


            const data = await fetchChangeAvatarService(
                API_URL_FOR_AVATAR,
                token,
                updatedFormDataAvatar
            );

            updateCurrentUser({...currentUser, avatar: data.data.newAvatar.avatar});
            setFormDataAvatar(null);

            PushNotification("Avatar actualizado correctamente", { type: "success"});

        } catch (error) {
            
            PushNotification(error.message, { type: "error"});
        };
    };

    const handleAvatarChange = (e) => {

        setFormDataAvatar(e.target.files[0]);
    };

    const handleAvatarEdit = (e) => {
        
        e.preventDefault();

        setEditingAvatar(true);
        setEditingProfile(false);
        setEditingPassword(false);
    };

    const handleAvatarBack = (e) => {

        e.preventDefault();

        setEditingAvatar(false);
        setFormDataAvatar({
            fileName: "",
        });
    };

    const handleFileInputClick = () => {

        fileInputRef.current.click();
    };

    return (

        <fieldset className="flex flex-col justify-center items-center">

            <section className="h-48 w-48 relative flex justify-center items-center">

                <img src={`${API_URL}${avatar}`} alt="user-avatar"
                    className="mt-2 mx-auto w-48" />
                        
                <button type="button" className="absolute top-[calc(85%)] left-[calc(80%)] ">
                    <img src={`${API_URL}/media/edit.svg`} alt="edit-svg"
                        className="w-6 h-6"
                        onClick={handleAvatarEdit} />
                </button>

            </section>

            {editingAvatar && (

                <section className="mt-4 flex flex-col justify-center items-center">
                    
                    <label htmlFor="fileUpload" className="text-lg mb-2">
                        Seleccione su avatar</label>

                    <section className="mt-2 w-full flex flex-row items-center">

                        <input type="file" name="fileUpload" className="hidden"
                            ref={fileInputRef} onChange={handleAvatarChange} />
                        <button type="button" className="mx-auto w-11 h-11 hover:scale-105 transition-transform duration-300"
                            onClick={handleFileInputClick}>
                            <img src={`${API_URL}/media/upload.svg`} alt="upload-file-svg" />
                        </button>

                        {formDataAvatar?.name && <p className="mx-auto text-lg">{formDataAvatar.name}</p>}

                    </section>

                    <section className="mt-6 w-full flex flex-row justify-between">

                        <button className="w-11 h-11 rounded-lg overflow-hidden  hover:scale-105 transition-transform duration-300"
                            onClick={handleAvatarBack}>
                            <img src={`${API_URL}/media/back-arrow.svg`} alt="back-arrow-svg" />
                        </button>

                        <button className="ml-6 w-44 bg-black text-white py-2 rounded-lg font-bold text-lg hover:scale-105 transition-transform duration-300"
                            onClick={handleAvatarSubmit}>
                            Subir archivo</button>

                    </section>

                </section>

            )}
        </fieldset>
    );
};

export default ProfileAvatarComponent;