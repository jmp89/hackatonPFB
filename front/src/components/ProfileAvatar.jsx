const ProfileAvatar = ({
    placeholders,
    formDataAvatar,
    editingAvatar,
    handleAvatarSubmit,
    handleAvatarEdit,
    handleAvatarChange,
    handleAvatarBack,
    handleFileInputClick,
    fileInputRef
}) => {

    return (

        <fieldset className="flex flex-col justify-center items-center">

            <section className="h-48 w-48 relative flex justify-center items-center">

                <img src={`http://localhost:3001${placeholders.avatar}`} alt="user-avatar"
                    className="mt-2 mx-auto w-48" />
                        
                <button type="button" className="absolute top-[calc(85%)] left-[calc(80%)] ">
                    <img src="http://localhost:3001/media/edit.svg" alt="edit-svg"
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
                            <img src="http://localhost:3001/media/upload.svg" alt="upload-file-svg" />
                        </button>

                        {formDataAvatar?.name && <p className="mx-auto text-lg">{formDataAvatar.name}</p>}

                    </section>

                    <section className="mt-6 w-full flex flex-row justify-between">

                        <button className="w-11 h-11 rounded-lg overflow-hidden  hover:scale-105 transition-transform duration-300"
                            onClick={handleAvatarBack}>
                            <img src="http://localhost:3001/media/back-arrow.svg" alt="back-arrow-svg" />
                        </button>

                        <button className="ml-6 w-44 bg-black text-white py-2 rounded-lg font-bold text-lg hover:scale-105 transition-transform duration-300"
                            onClick={handleAvatarSubmit}>
                            Subir archivo</button>

                    </section>

                </section>

            )}
        </fieldset>
    );
};

export default ProfileAvatar;