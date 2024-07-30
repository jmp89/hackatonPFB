import { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import ProfileGeneral from "./ProfileGeneral";
import ProfileAvatar from "./ProfileAvatar";
import ProfilePassword from "./ProfilePassword";
import MyInscriptions from "./MyInscriptions";
import RateEvent from "../pages/RateEventPage"
import PushNotification from "./PushNotification";

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

                        <ProfileAvatar
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

    
                        {/* <button className="mt-10">Información</button>
                        <button>Mis eventos activos</button>
                        <button>Mis eventos finalizados</button> */}

                        <ProfileGeneral
                            token={token}
                            updateCurrentUser={updateCurrentUser}
                            placeholders={placeholders}
                            setEditingAvatar={setEditingAvatar}
                            editingProfile={editingProfile}
                            setEditingProfile={setEditingProfile}
                            setEditingPassword={setEditingPassword}
                            PushNotification={PushNotification}
                        />

                        <ProfilePassword
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

                        <MyInscriptions 
                            token={token}
                            PushNotification={PushNotification}
                        />

                        <RateEvent
                            token={token}
                            PushNotification={PushNotification}
                        />

                    </section>

                </main>
        }
        </>
    );
};

export default UserProfile;