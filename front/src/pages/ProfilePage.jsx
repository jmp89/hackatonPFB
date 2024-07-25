import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
    const { currentUser } = useAuth();
    const [editingField, setEditingField] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        personal_info: ''
    });

    let user;
    try {
        user = typeof currentUser === 'string' ? JSON.parse(currentUser) : currentUser;
        if (!user) throw new Error("User data is missing");
    } catch (error) {
        console.error("Error al parsear currentUser:", error);
        return <p>Error al procesar los datos del usuario.</p>;
    }

    if (editingField === null && formData.name === '') {
        setFormData({
            name: user.name || '',
            email: user.email || '',
            personal_info: user.personal_info || ''
        });
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleEditClick = (field) => {
        setEditingField(field);
    };

    const handleSaveClick = async (field) => {
        if (!formData.name || !formData.email) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/users/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Perfil actualizado con éxito:', data);
                setEditingField(null);
            } else {
                console.error('Error al actualizar el perfil:', data);
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    };

    return (
        <main className="flex items-center justify-center px-4">
            <section className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mt-10">
                <img className="w-24 h-24 rounded-full mb-4" src={user.avatarUrl || '/default-avatar.png'} alt="Avatar" />
                <h2 className="text-2xl font-bold mb-4">Perfil del usuario</h2>
                <form className="w-full">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Nombre de usuario</label>
                        {editingField === 'name' ? (
                            <>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder={formData.name}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => handleSaveClick('name')}
                                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                                >
                                    Guardar
                                </button>
                            </>
                        ) : (
                            <>
                                <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                                    {user.name || 'No disponible'}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => handleEditClick('name')}
                                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                                >
                                    Editar
                                </button>
                            </>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        {editingField === 'email' ? (
                            <>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder={formData.email}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => handleSaveClick('email')}
                                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                                >
                                    Guardar
                                </button>
                            </>
                        ) : (
                            <>
                                <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                                    {user.email || 'No disponible'}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => handleEditClick('email')}
                                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                                >
                                    Editar
                                </button>
                            </>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Información personal</label>
                        {editingField === 'personal_info' ? (
                            <>
                                <input
                                    type="text"
                                    name="personal_info"
                                    placeholder={formData.personal_info}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleSaveClick('personal_info')}
                                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                                >
                                    Guardar
                                </button>
                            </>
                        ) : (
                            <>
                                <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                                    {user.personal_info || 'No disponible'}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => handleEditClick('personal_info')}
                                    className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                                >
                                    Editar
                                </button>
                            </>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
                        <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                            {user.role || 'No asignado'}
                        </p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Perfil creado</label>
                        <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                            {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'No disponible'}
                        </p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Perfil modificado</label>
                        <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                            {user.modified_at ? new Date(user.modified_at).toLocaleDateString() : 'No disponible'}
                        </p>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default ProfilePage;
