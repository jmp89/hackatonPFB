import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import fetchUserLoginService from "../services/fetchUserLoginService.js";
import AuthContext from "../context/AuthContext.jsx";

const LoginForm = () => {

    const { token, setToken } = useContext(AuthContext);

    const [ formData, setFormData ] = useState({email: "", password: ""});

    const [ error, setError ] = useState(null);
    const [ loginOk, setLoginOk ] = useState(null);

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        
        try {
            
            const data = await fetchUserLoginService(formData.email, formData.password, setError, setLoginOk);
            
            if (!data || data.length < 1){
            
                const err = new Error("Error en la petición.");
                err.httpStatus = 500;
                throw err;
            };
            
            localStorage.setItem("token", data)
            setToken(data);

            setFormData({email: "", password: ""});
            setLoginOk("Inicio de sesión exitoso, redirigiendo a la página principal...")
            setError(null);
            
        } catch (error) {
            
            setError(error.message);
            setLoginOk(null);
        };
    };

    const handleChange = (e) => {

        e.preventDefault();

        const { name, value } = e.target;

        setFormData({...formData, [name]: value});
    };

    return (
        token
        ? <Navigate to="/" />
        : <>
                <h2 className="mt-8 uppercase text-5xl font-bold text-center flex justify-center items-end
                    sm:mt-32">
                    Login</h2>

                <form className="flex flex-col justify-start items-center gap-2.5" 
                    onSubmit={handleSubmit}>
                    
                    <label className="uppercase mt-14 text-xl font-bold" 
                        htmlFor="email">Email</label>
                        
                    <input className="text-xl w-72 h-12 border-2 border-solid border-gray-300 rounded-xl p-4
                        focus:outline-none focus:border-black focus:border-solid focus:border-3
                        sm:w-96"
                        type="email" id="email" name="email" placeholder="Email" required
                        value={formData.email} onChange={handleChange} />
                    
                    <label className="uppercase mt-10 text-xl font-bold"
                        htmlFor="password">Contraseña</label>
                        
                    <input className="text-xl w-72 h-12 border-2 border-solid border-gray-300 rounded-xl p-4
                        focus: outline-none focus:border-black focus:border-solid focus:border-3
                        sm:w-96"
                        type="password" id="password" name="password" placeholder="Contraseña" required
                        value={formData.password} onChange={handleChange} />
                    
                    <button className="w-32 text-xl uppercase text-white bg-black max-w-96 mt-10 border-none rounded-3xl p-1
                        hover:shadow-custom hover:font-bold
                        sm:w-36"
                        >Login</button>

                    {error && <p className="mt-5 text-xl text-red-500 font-bold text-center">{error}</p>}
                    {loginOk && <p className="mt-5 text-xl text-green-600 font-bold text-center">{loginOk}</p>}
                
                </form>

            </>
    );
};

export default LoginForm;