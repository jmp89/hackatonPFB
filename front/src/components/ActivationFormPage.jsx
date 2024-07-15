import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ActivationFormPage = () => {
  const [registrationCode, setRegistrationCode] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`http://localhost:3001/users/validate/${registrationCode}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Error en la activación');
      }

      const result = await response.json();
      navigate('/users/validate/activation-success', { state: { message: result.message } });
    } catch (error) {
      setError(error.message || 'Error en la activación');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md px-6 py-12 bg-white shadow-lg rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Activar Cuenta</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            value={registrationCode}
            onChange={(e) => setRegistrationCode(e.target.value)}
            className="px-4 py-2 border rounded mb-4"
            placeholder="Código de Registro"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Activar
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default ActivationFormPage;