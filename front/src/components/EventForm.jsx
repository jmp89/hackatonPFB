import { useState } from 'react';
import { fetchEvent, saveEvent } from '../services/eventService';

const useEventForm = (eventId, token) => {
  const [event, setEvent] = useState({
    name: '',
    technology: '',
    online_on_site: 'online',
    city: '',
    start_date: '',
    finish_date: '',
    category: '',
    description: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    saveEvent(event, token, eventId)
      .then(data => alert(data.message))
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  };

  // Cargar datos del evento si existe el ID del evento
  useState(() => {
    if (eventId) {
      setLoading(true);
      fetchEvent(eventId, token)
        .then(data => setEvent(data))
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    }
  }, [eventId, token]);

  return { event, handleChange, handleSubmit, error, loading };
};

export default useEventForm;

