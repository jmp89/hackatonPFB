import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import fetchUserLoginService from "../services/fetchUserLoginService.js";
import { useAuth } from "../context/AuthContext";

const LoginForm = () => {
  const { token, updateToken } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loginOk, setLoginOk] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await fetchUserLoginService(
        formData.email,
        formData.password,
        setError,
        setLoginOk
      );

      if (!data.token || data.token.length < 1) {
        const err = new Error("Error en la petición.");
        err.httpStatus = 500;
        throw err;
      }

      updateToken(data.token);
      setFormData({ email: "", password: "" });
      setLoginOk("Inicio de sesión exitoso, redirigiendo a la página principal...");
      setError(null);
    } catch (error) {
      setError(error.message);
      setLoginOk(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return token ? (
    <Navigate to="/" />
  ) : (
    <main className="flex items-start justify-center px-4">
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mt-10">
        <h2 className="text-2xl font-bold text-center mb-6">LOGIN</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loginOk && <p className="text-green-500 mb-4">{loginOk}</p>}

        <fieldset>
          <section className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium mb-2">
              Email
            </label>
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
            <label htmlFor="password" className="block text-lg font-medium mb-2">
              Contraseña
            </label>
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

        <button type="submit" className="w-44 bg-black text-white py-2 rounded-lg font-bold text-lg mb-4 hover:scale-105 transition-transform duration-300">
          LOGIN
        </button>

        <section className="text-center mb-4">
        <Link to="/reset-password" className="text-blue-500 text-sm">He olvidado mi contraseña</Link>
        </section>
      </form>
    </main>
  );
};

export default LoginForm;
