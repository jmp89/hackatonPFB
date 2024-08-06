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

        <fieldset className="flex flex-col justify-center items-center clip-path-circleImage">

            <section className="mt-6 mb-4 h-48 w-48 relative flex justify-center items-center">

                <div className="h-48 w-48 rounded-full overflow-hidden flex justify-center items-center">
                    <img src={`${API_URL}${avatar}`} alt="user-avatar"
                        className="w-full h-full object-cover" />
                </div>
                        
                <button type="button" className="absolute top-[calc(85%)] left-[calc(85%)] ">
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

                        <button className="px-4 py-2 rounded-lg overflow-hidden bg-black  text-white font-bold  hover:scale-105 transition-transform duration-300"
                            onClick={handleAvatarBack}>
                            Volver
                        </button>

                        <button className="ml-6 mr-24 w-44 bg-black text-white py-2 rounded-lg font-bold text-lg hover:scale-105 transition-transform duration-300"
                            onClick={handleAvatarSubmit}>
                            Subir archivo</button>

                    </section>

                </section>

            )}
        </fieldset>
    );
};

export default ProfileAvatarComponent;