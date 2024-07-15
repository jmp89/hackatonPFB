import React, { useState } from 'react';
import { initiatePassword } from '../services/initiatePasswordServices';
import { resetPassword } from '../services/resetPasswordServices';

const ResetPass = () => {
    const [email, setEmail] = useState('');
    const [recoverPassCode, setRecoverPassCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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
        if (newPassword !== confirmPassword) {
            setMessage('Las contraseñas no coinciden.');
            return;
        }
        try {
            const response = await resetPassword({
                email,
                recoverPassCode,
                newPassword,
                repeatNewPassword: confirmPassword,
            });
            setMessage(response.message || 'Contraseña cambiada correctamente.');
            setStep(3);
        } catch (error) {
            setMessage(`Error en la solicitud: ${error.message}`);
        }
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center mb-6">Recuperar Contraseña</h2>
                {step === 1 && (
                    <form onSubmit={handleEmailSubmit}>
                        <div className="mb-4 flex flex-col items-center">
                            <label className="block text-lg font-medium mb-2 text-center">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-black px-4 py-2"
                                placeholder="Escribe tu email"
                            />
                        </div>
                        <button type="submit" className="w-full bg-black text-white py-2 rounded-lg font-bold text-lg">
                            Enviar código de verificación
                        </button>
                    </form>
                )}
                {step === 2 && (
                    <form onSubmit={handlePasswordReset}>
                        <div className="mb-4 flex flex-col items-center">
                            <label className="block text-lg font-medium mb-2 text-center">Código de verificación</label>
                            <input
                                type="text"
                                value={recoverPassCode}
                                onChange={(e) => setRecoverPassCode(e.target.value)}
                                required
                                className="w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-black px-4 py-2"
                                placeholder="Escribe el código de verificación"
                            />
                        </div>
                        <div className="mb-4 flex flex-col items-center">
                            <label className="block text-lg font-medium mb-2 text-center">Nueva Contraseña</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className="w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-black px-4 py-2"
                                placeholder="Escribe tu nueva contraseña"
                            />
                        </div>
                        <div className="mb-4 flex flex-col items-center">
                            <label className="block text-lg font-medium mb-2 text-center">Repite la Contraseña</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-black px-4 py-2"
                                placeholder="Repite tu nueva contraseña"
                            />
                        </div>
                        <button type="submit" className="w-full bg-black text-white py-2 rounded-lg font-bold text-lg">
                            Restablecer Contraseña
                        </button>
                    </form>
                )}
                {step === 3 && (
                    <p className="bg-green-500 text-white py-2 rounded-lg font-bold text-lg text-center">
                        Contraseña cambiada correctamente.
                    </p>
                )}
                {message && <p className="text-center text-red-500 mt-4">{message}</p>}
            </div>
        </main>
    );
};

export default ResetPass;
