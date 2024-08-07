import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initiatePassword } from '../services/initiatePasswordServices.js';
import { resetPassword } from '../services/resetPasswordServices.js';
import PushNotification from '../components/PushNotification.jsx';

const ResetPass = () => {
    const [email, setEmail] = useState('');
    const [recoverPassCode, setRecoverPassCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1);
    const [countdown, setCountdown] = useState(5);
    const navigate = useNavigate();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await initiatePassword(email);
            if (response) {
                setStep(2);
                PushNotification(
                    'Código de verificación enviado a tu correo electrónico.',
                    { type: 'info' }
                );
            }
        } catch (error) {

            PushNotification(error.message, { type: 'error' });
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            PushNotification('Las contraseñas no coinciden.', {
                type: 'error',
            });
            return;
        }

        try {
            const response = await resetPassword({
                email,
                recoverPassCode,
                newPassword
            });

            if (response.status === 'ok') {
                PushNotification(response.message, { type: 'success' });
                setStep(3);
            } else {
                throw new Error(response.message);
            }

        } catch (error) {
            PushNotification(error.message, {
                type: 'error',
            });
        };
    };

    const handleSubmit = (e) => {
        if (step === 1) {
            handleEmailSubmit(e);
        } else if (step === 2) {
            handlePasswordReset(e);
        }
    };

    useEffect(() => {
        if (step === 3) {
            const timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);

            const redirectTimer = setTimeout(() => {
                navigate('/users/login');
            }, 5000);

            return () => {
                clearInterval(timer);
                clearTimeout(redirectTimer);
            };
        }
    }, [step, navigate]);

    return (
        <section className="flex items-start justify-center px-4">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mt-10"
            >
                {step === 1 && (
                    <div className="w-full flex flex-col items-center">
                        <h2 className="text-2xl font-bold text-center mb-6">
                            Recuperar Contraseña
                        </h2>

                        <fieldset className="w-full">
                            <section className="mb-4 w-full">
                                <label className="block text-lg font-medium mb-2 text-center">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    placeholder="Escribe tu email"
                                />
                            </section>
                        </fieldset>
                        <button
                            type="submit"
                            className="w-44 bg-black text-white py-2 rounded-lg font-bold text-lg mb-4 hover:scale-105 transition-transform duration-300"
                        >
                            Enviar código de verificación
                        </button>
                    </div>
                )}
                {step === 2 && (
                    <div className="w-full flex flex-col items-center">
                        <fieldset className="w-full">

                            <section className="mb-4 w-full">
                                <label className="block text-lg font-medium mb-2 text-center">
                                    Código de verificación
                                </label>
                                <input
                                    type="text"
                                    value={recoverPassCode}
                                    onChange={(e) =>
                                        setRecoverPassCode(e.target.value)
                                    }
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    placeholder="Escribe el código de verificación"
                                />
                            </section>

                            <section className="mb-4 w-full">
                                <label className="block text-lg font-medium mb-2 text-center">
                                    Nueva contraseña
                                </label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    placeholder="Escribe tu nueva contraseña"
                                />
                            </section>

                            <section className="mb-4 w-full">
                                <label className="block text-lg font-medium mb-2 text-center">
                                    Repita la contraseña
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    placeholder="Repite tu nueva contraseña"
                                />
                            </section>
                        </fieldset>
                        <button
                            type="submit"
                            className="w-44 bg-black text-white py-2 rounded-lg font-bold text-lg mb-4 hover:scale-105 transition-transform duration-300"
                        >
                            Restablecer contraseña
                        </button>
                    </div>
                )}
                {step === 3 && (
                    <>
                        <p className="bg-black text-white py-2 rounded-lg font-bold text-lg text-center w-full max-w-md mx-4 md:mx-auto mb-4 shadow-md">
                            Contraseña cambiada correctamente
                        </p>
                        <p className="text-center text-lg font-medium">
                            Redirigiendo en {countdown} segundos...
                        </p>
                    </>
                )}
            </form>
        </section>
    );
};

export default ResetPass;

