import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
    const { currentUser } = useAuth();

    console.log("currentUser:", currentUser);

    let user;
    try {
        user = typeof currentUser === 'string' ? JSON.parse(currentUser) : currentUser;
        
        console.log("Parsed user:", user);
    } catch (error) {
        console.error("Error al parsear currentUser:", error);
        return <p>Error al procesar los datos del usuario.</p>;
    }

    if (!user) {
        return <p>No se encontró el perfil del usuario.</p>;
    }

    return (
        <main className="flex items-center justify-center px-4">
            <section className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mt-10">
                <img className="w-24 h-24 rounded-full mb-4" src={user.avatarUrl || '/default-avatar.png'} alt="Avatar" />
                <h2 className="text-2xl font-bold mb-4">Perfil del usuario</h2>
                <div className="w-full">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Nombre de usuario</label>
                        <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">{user.name || 'No disponible'}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">{user.email || 'No disponible'}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Información personal</label>
                        <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">{user.personal_info || 'No disponible'}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Perfil verificado</label>
                        <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">{user.active === 1 ? 'Sí' : 'No'}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
                        <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">{user.role || 'No asignado'}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Perfil creado</label>
                        <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">{user.created_at ? new Date(user.created_at).toLocaleDateString() : 'No disponible'}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Perfil modificado</label>
                        <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">{user.modified_at ? new Date(user.modified_at).toLocaleDateString() : 'No disponible'}</p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ProfilePage;
