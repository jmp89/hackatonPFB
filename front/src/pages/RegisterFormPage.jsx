import React, { useState } from 'react';

const RegisterFormPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Hubo un problema al procesar tu solicitud. Por favor, intenta de nuevo más tarde.');
      }

      setSuccess(responseData.message);
      setFormData({
        name: '',
        email: '',
        password: ''
      });
      setError(null);
    } catch (error) {
      console.error('Error al registrar el usuario:', error.message);
      setError(error.message || 'Hubo un problema al procesar tu solicitud. Por favor, intenta de nuevo más tarde.');
      setSuccess(null);
    }
  };

  return (
    <main className="flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mt-10">
        <h2 className="text-2xl font-bold text-center mb-6">REGISTRARSE</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <fieldset>
          <section className="mb-4">
            <label htmlFor="name" className="block text-lg font-medium mb-2">Usuario</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Nombre de usuario"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </section>

          <section className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </section>

          <section className="mb-4">
            <label htmlFor="password" className="block text-lg font-medium mb-2">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </section>
        </fieldset>

        <button type="submit" className="w-44 bg-black text-white py-2 rounded-lg font-bold text-lg mb-4 hover:scale-105 transition-transform duration-300">REGISTRARSE</button>

        <section className="text-sm text-gray-700">
          <h2 className="text-lg font-bold mb-2">Políticas de usuario</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Al registrarse en hackaverse.com, usted acepta estos términos y condiciones. Si no está de acuerdo, no complete el registro.</li>
            <li>Debe ser mayor de 18 años o tener consentimiento parental para registrarse.</li>
            <li>Proporcione información precisa y actualizada. Mantenga su contraseña segura y notifique cualquier uso no autorizado de su cuenta.</li>
            <li>Su información se manejará según nuestra <a href="#" className="text-blue-500">Política de Privacidad</a>. No compartiremos su información sin su consentimiento, excepto por exigencias legales.</li>
            <li>No use cuentas de terceros, no proporcione información falsa, ni realice actividades ilegales en el sitio.</li>
            <li>Podemos cancelar su cuenta por violaciones de estos términos. Usted puede cancelarla contactando a soporte@hackaverse.com.</li>
            <li>Podemos modificar estos términos en cualquier momento. Revise estos términos periódicamente para estar al tanto de cambios.</li>
            <li>Para preguntas, contáctenos en soporte@hackaverse.com.</li>
          </ol>
        </section>
      </form>
    </main>
  );
}

export default RegisterFormPage;
