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
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-4 md:mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Activar Cuenta</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <fieldset className="w-full">
          <section className="mb-4">
            <label htmlFor="registrationCode" className="block text-lg font-medium mb-2">
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

        <button type="submit" className="w-44 bg-black text-white py-2 rounded-lg font-bold text-lg mb-4 hover:scale-105 transition-transform duration-300">
          Activar
        </button>
      </form>
    </main>
  );
};

export default ActivationFormPage;