import React, { useState } from 'react';
import { initiatePassword } from '../services/initiatePasswordServices';
import { resetPassword } from '../services/resetPasswordServices';

const ResetPass = () => {
    const [email, setEmail] = useState('');
    const [recoverPassCode, setRecoverPassCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [step, setStep] = useState(1);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        try {
            await initiatePassword(email);
            setMessage('Código de verificación enviado a tu correo electrónico.');
            setStep(2);
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        try {
            const response = await resetPassword(email, recoverPassCode, newPassword);
            setMessage(response.message || 'Contraseña cambiada correctamente.');
            setStep(3); 
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Recuperar Contraseña</h2>
                {step === 1 && (
                    <form onSubmit={handleEmailSubmit}>
                        <div>
                            <label className="block text-lg font-medium mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                        <button type="submit" className="w-full bg-black text-white py-1 my-5 rounded-lg font-bold text-lg mb-4">
                            Enviar código de verificación
                        </button>
                    </form>
                )}
                {step === 2 && (
                    <form onSubmit={handlePasswordReset}>
                        <div>
                            <label className="block text-lg font-medium mb-2">Código de verificación:</label>
                            <input
                                type="text"
                                value={recoverPassCode}
                                onChange={(e) => setRecoverPassCode(e.target.value)}
                                required
                                className="w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-medium mb-2">Nueva Contraseña:</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className="w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                            />
                        </div>
                        <button type="submit" className="w-full bg-black text-white py-1 my-5 rounded-lg font-bold text-lg mb-4">
                            Restablecer Contraseña
                        </button>
                    </form>
                )}
                {step === 3 && (
                    <p className="w-full bg-black text-white py-1 my-5 rounded-lg font-bold text-lg mb-4">
                        Contraseña cambiada correctamente.
                    </p>
                )}
                {message && <p>{message}</p>}
            </div>
        </main>
    );
};

export default ResetPass;
