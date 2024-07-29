import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ActivationPage = () => {
    const navigate = useNavigate();
    const [registrationCode, setRegistrationCode] = useState('');
    const [error, setError] = useState(null);
    const [isActivated, setIsActivated] = useState(false);
    const [message, setMessage] = useState('');
    const [counter, setCounter] = useState(5);

    useEffect(() => {
        if (isActivated) {
            const timer = setInterval(() => {
                setCounter((prevCounter) => {
                    if (prevCounter === 1) {
                        clearInterval(timer);
                        navigate('/users/login');
                    }
                    return prevCounter - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [isActivated, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch(
                import.meta.env.VITE_API_URL + `/users/validate/${registrationCode}`,
                {
                    method: 'GET',
                }
            );

            if (!response.ok) {
                throw new Error('Error en la activación');
            }

            const result = await response.json();
            setMessage(result.message);
            setIsActivated(true);
            toast.success('Cuenta activada con éxito');
        } catch (error) {
            setError(error.message || 'Error en la activación');
            toast.error(error.message);
        }
    };

    if (isActivated) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="max-w-md px-6 py-12 bg-white shadow-lg rounded-lg text-center">
                    <FaCheckCircle className="text-green-500 text-6xl mb-4" />
                    <h2 className="text-3xl font-bold mb-4">Activación Exitosa</h2>
                    <p className="text-lg mb-8">{message}</p>
                    <p className="text-lg mb-8">Redirigiendo en {counter} segundos...</p>
                    <a href="/users/login" className="text-blue-500 underline hover:text-blue-700">
                        Volver al login
                    </a>
                </div>
            </div>
        );
    }

    return (
        <section className="flex items-center justify-center mt-20 bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-4 md:mx-auto"
            >
                <h2 className="text-2xl font-bold text-center mb-6">
                    Activar Cuenta
                </h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <fieldset className="w-full">
                    <section className="mb-4">
                        <label
                            htmlFor="registrationCode"
                            className="block text-lg font-medium mb-2"
                        >
                            Código de Registro
                        </label>
                        <input
                            type="text"
                            id="registrationCode"
                            name="registrationCode"
                            placeholder="Código de Registro"
                            value={registrationCode}
                            onChange={(e) => setRegistrationCode(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            required
                        />
                    </section>
                </fieldset>

                <button
                    type="submit"
                    className="w-44 bg-black text-white py-2 rounded-lg font-bold text-lg mb-4 hover:scale-105 transition-transform duration-300"
                >
                    Activar
                </button>
            </form>
        </section>
    );
};

export default ActivationPage;


