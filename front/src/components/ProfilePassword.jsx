import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const API_URL_FOR_PASSWORD = API_URL + "/users/edit-password";


const ProfilePassword = ({
    token,
    placeholders,
    setEditingAvatar,
    setEditingProfile,
    editingPassword,
    setEditingPassword,
    PushNotification
}) => {

    const [ formDataPassword, setFormDataPassword ] = useState({
        oldPassword: "",
        newPassword: "",
        repeatNewPassword: "",
    });

    const handlePasswordSubmit = async (e) => {

        e.preventDefault();

        try {

            if (
                formDataPassword.oldPassword.length < 1 ||
                formDataPassword.newPassword.length < 1 ||
                formDataPassword.repeatNewPassword.length < 1){

                    throw new Error("Faltan campos por cubrir");
            };

            if (formDataPassword.newPassword !== formDataPassword.repeatNewPassword){
                throw new Error("Las contraseñas no coinciden");
            };

            const updatedFormDataPassword = ({
                email: placeholders.email,
                oldPassword: formDataPassword.oldPassword,
                newPassword: formDataPassword.newPassword,
            });

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

            setFormDataPassword({
                oldPassword: "",
                newPassword: "",
                repeatNewPassword: "",
            });

            setEditingPassword(false);

            PushNotification("Contraseña actualizada correctamente", { type: "success"});

        } catch (error) {
            
            PushNotification(error.message, { type: "error"});
        };
    };

    const handlePasswordChange = (e) => {

      setFormDataPassword({...formDataPassword, [e.target.name]: e.target.value});  
    };

    const handlePasswordEdit = (e) => {

        e.preventDefault();

        setEditingPassword(true);
        setEditingProfile(false);
        setEditingAvatar(false);
    };

    const handlePasswordBack = (e) => {

        e.preventDefault();

        setEditingPassword(false);
        setFormDataPassword({
            oldPassword: "",
            newPassword: "",
            repeatNewPassword: "",
        });
    };

    return (
        <>
            {!editingPassword

                ? (
                
                <fieldset className="flex flex-col">

                    <label className="mt-6 flex flex-row items-center text-lg">
                        <img src={`${API_URL}/media/pass1.svg`} alt="email-svg" className="w-6 h-6 mr-4" />
                        <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            type="text" name="password" value="*****************" disabled />
                    </label>

                    <button className="mt-4 mb-6 mx-auto w-44 bg-black text-white py-2 rounded-lg font-bold text-lg hover:scale-105 transition-transform duration-300 sm:w-60"
                        onClick={handlePasswordEdit}>Cambiar contraseña</button>

                </fieldset >

                ) : (
                
                <fieldset className="flex flex-col text-lg">
                    

                    <label htmlFor="oldPassword" className="mt-6">
                        Antigua contraseña</label>
                    <input className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        type="password" name="oldPassword" value={formDataPassword.oldPassword} onChange={handlePasswordChange} />

                    <label htmlFor="newPassword" className="mt-4">
                        Nueva contraseña</label>
                    <input className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        type="password" name="newPassword" value={formDataPassword.newPassword} onChange={handlePasswordChange} />

                    <label htmlFor="repeatNewPassword" className="mt-4">
                        Repita la nueva contraseña</label>
                    <input className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        type="password" name="repeatNewPassword" value={formDataPassword.repeatNewPassword} onChange={handlePasswordChange} />

                    <section className="mt-4 mb-6 flex flex-row justify-evenly">

                        <button className="w-11 h-11 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                            onClick={handlePasswordBack}>
                                <img src={`${API_URL}/media/back-arrow.svg`} alt="back-arrow-svg" />
                            </button>

                        <button className="w-44 bg-black text-white py-2 rounded-lg font-bold text-lg hover:scale-105 transition-transform duration-300"
                            onClick={handlePasswordSubmit}>Cambiar</button>
                    
                    </section>

                </fieldset>)
            }
        </>
    );
};

export default ProfilePassword;