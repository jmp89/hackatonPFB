import { useState, useEffect } from 'react';
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
      .then(data => {
        console.log('Event saved:', data);
        alert(data.message);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (eventId) {
      setLoading(true);
      fetchEvent(eventId, token)
        .then(data => {
          console.log('Event fetched:', data);
          setEvent(data);
        })
        .catch(error => setError(error))
        .finally(() => setLoading(false));
    }
  }, [eventId, token]);

  return { event, handleChange, handleSubmit, error, loading };
};

export default useEventForm;
