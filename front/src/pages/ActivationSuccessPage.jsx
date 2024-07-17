import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const ActivationSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state ? location.state.message : 'Usuario activado correctamente';
  const [counter, setCounter] = useState(5);

  useEffect(() => {
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
  }, [navigate]);

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
};

export default ActivationSuccessPage;
