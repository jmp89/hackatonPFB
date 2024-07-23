import React, { useState, useEffect } from 'react';

const ProfilePage = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        personal_info: '',
        avatar: '',
        active: false,
        role: '',
        created_at: '',
        modified_at: ''
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:3001/users/edit');
                const data = await response.json();
                setUserData(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error al traer los datos:', error);
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/users/edit', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ajusta si necesitas token para autenticación
                },
                body: JSON.stringify({
                    name: userData.name,
                    email: userData.email,
                    personal_info: userData.personal_info,
                }),
            });
            const result = await response.json();
            if (response.ok) {
                alert('Perfil actualizado exitosamente');
            } else {
                console.error('Error al actualizar el perfil:', result.message);
                alert(`Error actualizando el perfil: ${result.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    return (
        <main className="flex items-center justify-center px-4">
            <section className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mt-10">
                <img className="w-24 h-24 rounded-full mb-4" src={userData.avatar} alt="Avatar" />
                <h2 className="text-2xl font-bold mb-4">Perfil del usuario</h2>
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Nombre de usuario
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            value={userData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            value={userData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="new_password">
                            Nueva Contraseña
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="new_password"
                            type="password"
                            placeholder="Escribe nueva contraseña"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="repeat_new_password">
                            Repetir Nueva Contraseña
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="repeat_new_password"
                            type="password"
                            placeholder="Repite nueva contraseña"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="personal_info">
                            Información personal
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="personal_info"
                            value={userData.personal_info}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="active">
                            Perfil verificado
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="active"
                            type="checkbox"
                            checked={userData.active}
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                            Role
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="role"
                            type="text"
                            value={userData.role}
                            readOnly
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="created_at">
                            Perfil creado
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="created_at"
                            type="text"
                            value={userData.created_at}
                            disabled
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="modified_at">
                            Perfil modificado
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="modified_at"
                            type="text"
                            value={userData.modified_at}
                            disabled
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            className="w-44 bg-black text-white py-2 rounded-lg font-bold text-lg mb-4 hover:scale-105 transition-transform duration-300"
                            type="submit"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default ProfilePage;
