import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import eventConfirm from '../services/eventConfirmServices';
import { useAuth } from '../context/AuthContext';
import PushNotification from './PushNotification.jsx';

const EventConfirm = () => {
    const { eventCode } = useParams(); 
    const { token } = useAuth(); 
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            if (!token) {
                setError('Usuario no autenticado. Por favor, inicie sesión.');
                PushNotification('Usuario no autenticado, inicie sesión para confirmar la inscripción.', { type: 'error' });
                return;
            }

            if (!eventCode) {
                setError('Código de evento faltante.');
                PushNotification('Código de evento faltante.', { type: 'error' });
                return;
            }

            try {
                console.log('Token en EventConfirm:', token);
                console.log('Código de evento:', eventCode);
                const eventData = await eventConfirm(eventCode, token);
                console.log('Datos de la API:', eventData);

                if (eventData.status === 'ok') {
                    setSuccess(true);
                    PushNotification('Te has inscrito correctamente al evento.', { type: 'success' });
                } else {
                    setError(eventData.message || 'Error desconocido');
                    PushNotification(eventData.message || 'Fallo en la inscripción', { type: 'error' });
                }
            } catch (err) {
                console.error('Error fetching event:', err);
                setError('Error al confirmar la inscripción. Por favor, intente de nuevo más tarde.');
                PushNotification('Error al confirmar la inscripción. Por favor, intente de nuevo más tarde.', { type: 'error' });
            }
        };

        fetchEvent();
    }, [eventCode, token]);

    return (
        <div>
            {error && <div>Error: {error}</div>}
            {success && !error && <h1>Te has inscrito con éxito</h1>}
        </div>
    );
};

export default EventConfirm;
