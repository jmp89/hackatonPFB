const ProfileGeneral = ({
    placeholders,
    formDataProfile,
    editingProfile,
    handleProfileSubmit,
    handleProfileEdit,
    handleProfileChange,
    handleProfileBack,
    personalInfoRef
}) => {

    return (
        <>
        {!editingProfile

            ? (
                
                <fieldset className="flex flex-col text-lg">

                    <label htmlFor="username" className="mt-6 flex flex-row items-center">
                        <img src="http://localhost:3001/media/user.svg" alt="user-svg" className="w-7 h-7 mr-4" />
                        <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            type="text" name="username" value={placeholders.username} disabled />
                    </label>

                    <label htmlFor="email" className="mt-4 flex flex-row items-center">
                        <img src="http://localhost:3001/media/email.svg" alt="email-svg" className="w-6 h-6 mr-4" />
                        <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            type="text" name="email" value={placeholders.email} disabled />
                    </label>

                    <label htmlFor="personal_info" className="mt-4 flex flex-row items-start">
                        <img src="http://localhost:3001/media/description.svg" alt="email-svg" className="w-6 h-6 mr-4 mt-2" />
                        {/* <textarea ref={personalInfoRef} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black mb-2"*/}
                        <textarea className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black mb-2"    
                            name="personal_info" value={placeholders.personal_info}
                            onChange={handleProfileChange} rows="10" disabled />
                    </label>

                    {/* <label className="mt-4 flex flex-row items-center ">
                        <img src="http://localhost:3001/media/description.svg" alt="email-svg" className="w-6 h-6 mr-4" />
                        <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            ref={personalInfoRef} type="text" name="personal_info" value={placeholders.personal_info} disabled />
                    </label> */}

                    <label htmlFor="created_at" className="mt-4 flex flex-row items-center">
                        <img src="http://localhost:3001/media/date.svg" alt="email-svg" className="w-6 h-6 mr-4" />
                        <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            type="text" name="created_at" value={"Desde: " + placeholders.created_at.slice(0, 10)} disabled />
                    </label>

                    <button className="mt-4 mx-auto w-44 bg-black text-white py-2 rounded-lg font-bold hover:scale-105 transition-transform duration-300"
                        onClick={handleProfileEdit}>Editar perfil</button>

                </fieldset>

            ) : (

            <fieldset className="flex flex-col text-lg">

                <label htmlFor="name" className="mt-6">
                    Nombre
                    <input className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        type="text" name="name" placeholder={placeholders.name} value={formDataProfile.name} onChange={handleProfileChange} />
                </label>

                <label htmlFor="surname" className="mt-4">
                    Apellidos
                    <input className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        type="text" name="surname" placeholder={placeholders.surname} value={formDataProfile.surname} onChange={handleProfileChange} />
                </label>

                <label htmlFor="username" className="mt-4">
                    Usuario
                    <input className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        type="text" name="username" placeholder={placeholders.username} value={formDataProfile.username} onChange={handleProfileChange} />
                </label>

                <label htmlFor="email" className="mt-4">
                    Email
                    <input className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        type="email" name="email" placeholder={placeholders.email} value={formDataProfile.email} onChange={handleProfileChange} />
                </label>

                {/* <label className="mt-4">
                    Descripción
                    <input className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        ref={personalInfoRef} type="text" name="personal_info" placeholder={placeholders.personal_info} value={formDataProfile.personal_info} onChange={handleProfileChange} />
                </label> */}

                <label htmlFor="personal_info" className="block font-medium mb-2">Descripción
                    {/* <textarea ref={personalInfoRef} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black mb-2"*/}
                        <textarea className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black mb-2"
                        name="personal_info" placeholder={placeholders.personal_info} value={formDataProfile.personal_info} 
                        onChange={handleProfileChange} rows="10" />
                </label>

                <section className="mt-4 flex flex-row justify-evenly">

                    <button className="w-11 h-11 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                        onClick={handleProfileBack}>
                            <img src="http://localhost:3001/media/back-arrow.svg" alt="back-arrow-svg" />
                        </button>

                    <button className="w-44 bg-black text-white py-2 rounded-lg font-bold hover:scale-105 transition-transform duration-300"
                        onClick={handleProfileSubmit}>Actualizar perfil</button>

                </section>
                
            </fieldset>
            )
        }
        </>
    );
};

export default ProfileGeneral;