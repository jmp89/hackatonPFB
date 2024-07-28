import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import ProfileGeneral from "./ProfileGeneral";
import ProfileAvatar from "./ProfileAvatar";
import ProfilePassword from "./ProfilePassword";
import PushNotification from "./PushNotification";

const API_URL_FOR_PROFILE = import.meta.env.VITE_API_URL + "/users/edit";
const API_URL_FOR_PASSWORD = import.meta.env.VITE_API_URL + "/users/edit-password";
const API_URL_FOR_AVATAR = import.meta.env.VITE_API_URL + "/upload";

const UserProfile = () => {
    
    const { token, currentUser, updateCurrentUser } = useAuth();
    const [ placeholders, setPlaceHolders ] = useState({
        name: "",
        surname: "",
        username: "",
        email: "",
        personal_info: "",
        avatar: "",
        created_at: ""
    });
    const [ formDataProfile, setFormDataProfile ] = useState({
        name: "",
        surname: "",
        username: "",
        email: "",
        personal_info: "",
    });
    const [ formDataPassword, setFormDataPassword ] = useState({
        oldPassword: "",
        newPassword: "",
        repeatNewPassword: "",
    });
    const [ formDataAvatar, setFormDataAvatar ] = useState(null);
    const [ editingProfile, setEditingProfile ] = useState(false);
    const [ editingPassword, setEditingPassword ] = useState(false);
    const [ editingAvatar, setEditingAvatar ] = useState(false);
    // const [ success, setSuccess ] = useState(null);
    // const [ error, setError ] = useState(null);

    const fileInputRef = useRef(null);
    const personalInfoRef = useRef(null);

    useEffect(() => {

        if (currentUser){

            setPlaceHolders({
                name: currentUser.name || "",
                surname: currentUser.surname || "",
                username: currentUser.username || "",
                email: currentUser.email || "",
                personal_info: currentUser.personal_info || "",
                avatar: currentUser.avatar || "",
                created_at: currentUser.created_at || ""
            });
        };
    }, [currentUser]);

    // useEffect(() => {

    //     if (success || error) {

    //         const timer = setTimeout(() => {

    //             setSuccess(null);
    //             setError(null);
    //         }, 5000);

    //         return () => clearTimeout(timer);
    //     };
    // }, [success, error]);

    // useEffect(() => {
    //     if (personalInfoRef.current) {
    //         adjustTextareaHeight(personalInfoRef.current);
    //     }
    // }, [formDataProfile.personal_info]);

    // const adjustTextareaHeight = (textarea) => {
    //     textarea.style.height = "auto";
    //     textarea.style.height = `${textarea.scrollHeight}px`;
    // };

    const handleAvatarSubmit = async (e) => {

        e.preventDefault();

        try {

            if (!formDataAvatar){
                PushNotification("Por favor, seleccione un nuevo avatar", { type: "error"});
                return;
            };

            const updatedFormDataAvatar = new FormData();
            updatedFormDataAvatar.append('fileName', formDataAvatar);

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

            updateCurrentUser({...currentUser, avatar: data.data.newAvatar.avatar});
            setFormDataAvatar(null);

            // setSuccess("Avatar actualizado correctamente.");
            // setError(null);
            PushNotification("Avatar actualizado correctamente", { type: "success"});

        } catch (error) {
            
            // setError(error.message);
            // setSuccess(null);
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

    const handleProfileSubmit = async (e) => {
        
        e.preventDefault();
        
        try {

            const updatedFormDataProfile = {
                name: formDataProfile.name.length > 0 ? formDataProfile.name : placeholders.name,
                surname: formDataProfile.surname.length > 0 ? formDataProfile.surname : placeholders.surname,
                username: formDataProfile.username.length > 0 ? formDataProfile.username : placeholders.username,
                email: formDataProfile.email.length > 0 ? formDataProfile.email : placeholders.email,
                personal_info: formDataProfile.personal_info.length > 0 ? formDataProfile.personal_info : placeholders.personal_info,
            };

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

            updateCurrentUser(data.data.newUserInfo[0]);
            setFormDataProfile({
                name: "",
                surname: "",
                username: "",
                email: "",
                personal_info: "",
            });
            setEditingProfile(false)
            // setSuccess("Perfil actualizado correctamente.")
            // setError(null);
            PushNotification("Perfil actualizado correctamente", { type: "success"});
            
        } catch (error) {
            
            // setError(error.message);
            // setSuccess(null);
            PushNotification(error.message, { type: "error"});
        };
    };
    
    const handleProfileChange = (e) => {

        setFormDataProfile({...formDataProfile, [e.target.name]: e.target.value});

        if (e.target.name === 'personal_info') {
            adjustTextareaHeight(e.target);
        }
    };

    const handleProfileEdit = (e) => {

        e.preventDefault();

        setEditingProfile(true);
        setEditingPassword(false);
        setEditingAvatar(false);
    };

    const handleProfileBack = (e) => {

        e.preventDefault();

        setEditingProfile(false);
        setFormDataProfile({
            name: "",
            surname: "",
            username: "",
            email: "",
            personal_info: "",
        });
    };

    const handlePasswordSubmit = async (e) => {

        e.preventDefault();

        try {
            console.log(formDataPassword.newPassword);
            console.log(formDataPassword.repeatNewPassword);
            if (formDataPassword.newPassword !== formDataPassword.repeatNewPassword){
                throw new Error("Las contraseñas no coinciden.");
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

            // setSuccess("Contraseña actualizada correctamente.");
            // setError(null);
            PushNotification("Contraseña actualizada correctamente", { type: "success"});

        } catch (error) {
            
            // setError(error.message);
            // setSuccess(null);
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

    const handleFileInputClick = () => {

        fileInputRef.current.click();
    };

    return (
        <>
        <main className="flex flex-col justify-center items-center px-4">

            <form className="mt-10 mx-auto flex flex-col bg-white px-6 rounded-lg shadow-md w-full max-w-3xl">

                <h2 className="mt-6 text-2xl font-bold text-center">{placeholders.name + ", " + placeholders.surname}</h2>

                <ProfileAvatar 
                    placeholders={placeholders}
                    formDataAvatar={formDataAvatar}
                    editingAvatar={editingAvatar}
                    handleAvatarSubmit={handleAvatarSubmit}
                    handleAvatarEdit={handleAvatarEdit}
                    handleAvatarChange={handleAvatarChange}
                    handleAvatarBack={handleAvatarBack}
                    handleFileInputClick={handleFileInputClick}
                    fileInputRef={fileInputRef}
                />

                <ProfileGeneral
                    placeholders={placeholders}
                    formDataProfile={formDataProfile}
                    editingProfile={editingProfile}
                    handleProfileSubmit={handleProfileSubmit}
                    handleProfileEdit={handleProfileEdit}
                    handleProfileChange={handleProfileChange}
                    handleProfileBack={handleProfileBack}
                    personalInfoRef={personalInfoRef}
                />

                <ProfilePassword 
                    editingPassword={editingPassword}
                    formDataPassword={formDataPassword}
                    handlePasswordSubmit={handlePasswordSubmit}
                    handlePasswordChange={handlePasswordChange}
                    handlePasswordEdit={handlePasswordEdit}
                    handlePasswordBack={handlePasswordBack}
                />

            </form>

        </main>
        </>
    );
};

export default UserProfile;