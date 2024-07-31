import { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import ProfileAvatarComponent from "./ProfileAvatarComponent";
import ProfileGeneralComponent from "./ProfileGeneralComponent";
import ProfilePasswordComponent from "./ProfilePasswordComponent";
import MyInscriptionsComponent from "./MyInscriptionsComponent";
import RateEventComponent from "./RateEventComponent"
import PushNotification from "../PushNotification";

const UserProfileComponent = () => {
    
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
    
    const [ editingProfile, setEditingProfile ] = useState(false);
    const [ editingPassword, setEditingPassword ] = useState(false);
    const [ editingAvatar, setEditingAvatar ] = useState(false);

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

    return (
        <>

        {!token
        
            ? <Navigate to="/users/login" />

            :    <main className="flex flex-col justify-center items-center px-4">

                    <form className="mt-10 mx-auto flex flex-col bg-white px-6 rounded-t-lg shadow-md w-full max-w-3xl">

                        <h2 className="mt-6 text-2xl font-bold text-center">{placeholders.name + ", " + placeholders.surname}</h2>

                        <ProfileAvatarComponent
                            token={token}
                            currentUser={currentUser}
                            updateCurrentUser={updateCurrentUser}
                            placeholders={placeholders}
                            editingAvatar={editingAvatar}
                            setEditingAvatar={setEditingAvatar}
                            setEditingProfile={setEditingProfile}
                            setEditingPassword={setEditingPassword}
                            PushNotification={PushNotification}
                            />

                        <ProfileGeneralComponent
                            token={token}
                            updateCurrentUser={updateCurrentUser}
                            placeholders={placeholders}
                            setEditingAvatar={setEditingAvatar}
                            editingProfile={editingProfile}
                            setEditingProfile={setEditingProfile}
                            setEditingPassword={setEditingPassword}
                            PushNotification={PushNotification}
                        />

                        <ProfilePasswordComponent
                            token={token}
                            placeholders={placeholders}
                            setEditingAvatar={setEditingAvatar}
                            setEditingProfile={setEditingProfile}
                            editingPassword={editingPassword}
                            setEditingPassword={setEditingPassword}
                            PushNotification={PushNotification}
                        />

                    </form>

                    <section className="mx-auto flex flex-col bg-white px-6 rounded-b-lg shadow-md w-full max-w-3xl">

                        <MyInscriptionsComponent
                            token={token}
                            PushNotification={PushNotification}
                        />

                        <RateEventComponent
                            token={token}
                            PushNotification={PushNotification}
                        />

                    </section>

                </main>
        }
        </>
    );
};

export default UserProfileComponent;