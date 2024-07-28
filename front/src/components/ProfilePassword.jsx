const ProfilePassword = ({
    editingPassword,
    formDataPassword,
    handlePasswordSubmit,
    handlePasswordChange,
    handlePasswordEdit,
    handlePasswordBack
}) => {

    return (
        <>
            {!editingPassword

                ? (
                
                <fieldset className="flex flex-col">

                    <label className="mt-6 flex flex-row items-center text-lg">
                        <img src="http://localhost:3001/media/pass1.svg" alt="email-svg" className="w-6 h-6 mr-4" />
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
                                <img src="http://localhost:3001/media/back-arrow.svg" alt="back-arrow-svg" />
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