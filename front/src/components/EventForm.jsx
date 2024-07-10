import { useState, useEffect } from 'react';

const EventForm = ({ token }) => {
  const [eventData, setEventData] = useState({
    id: '',
    name: '',
    technology: '',
    online_on_site: '',
    city: '',
    category: '',
    organizer: '',
    start_date: '',
    finish_date: '',
    rating: '',
    total_participants: '',
    total_teams: ''
  });

  const [eventsList, setEventsList] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [isNewEvent, setIsNewEvent] = useState(false);

  useEffect(() => {
    // Fetch existing events list
    const fetchEventsList = async () => {
      try {
        const response = await fetch('/event', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch events list');
        }

        const data = await response.json();
        setEventsList(data.events);
      } catch (error) {
        console.error('Error fetching events list:', error);
      }
    };

    fetchEventsList();
  }, [token]);

  const handleSelectEvent = (eventId) => {
    if (eventId === 'new') {
      setIsNewEvent(true);
      setEventData({
        id: '',
        name: '',
        technology: '',
        online_on_site: '',
        city: '',
        category: '',
        organizer: '',
        start_date: '',
        finish_date: '',
        rating: '',
        total_participants: '',
        total_teams: ''
      });
    } else {
      const selectedEvent = eventsList.find(event => event.id === eventId);
      if (selectedEvent) {
        setIsNewEvent(false);
        setEventData(selectedEvent);
        setSelectedEventId(selectedEvent.id);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = isNewEvent ? '/event' : `/event/${selectedEventId}`;
      const method = isNewEvent ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(eventData)
      });

      if (!response.ok) {
        throw new Error('Failed to save event');
      }

      const data = await response.json();
      console.log('Event saved successfully:', data);
      // Optionally handle success (e.g., show success message, redirect, etc.)

    } catch (error) {
      console.error('Error submitting form:', error);
      // Optionally handle error (e.g., show error message to user)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Event Form</h2>
        <select className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black" onChange={(e) => handleSelectEvent(e.target.value)}>
          <option value="">Select an event</option>
          {eventsList.map(event => (
            <option key={event.id} value={event.id}>{event.name}</option>
          ))}
          <option value="new">Create new event</option>
        </select>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-medium mb-2">Name:</label>
            <input type="text" id="name" name="name" value={eventData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" required />
          </div>

          <div className="mb-4">
            <label htmlFor="technology" className="block text-lg font-medium mb-2">Technology:</label>
            <input type="text" id="technology" name="technology" value={eventData.technology} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" required />
          </div>

          <div className="mb-4">
            <label htmlFor="online_on_site" className="block text-lg font-medium mb-2">Online or On-site:</label>
            <select id="online_on_site" name="online_on_site" value={eventData.online_on_site} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" required>
              <option value="online">Online</option>
              <option value="on_site">On-site</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="city" className="block text-lg font-medium mb-2">City:</label>
            <input type="text" id="city" name="city" value={eventData.city} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" required />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-lg font-medium mb-2">Category:</label>
            <input type="text" id="category" name="category" value={eventData.category} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" required />
          </div>

          <div className="mb-4">
            <label htmlFor="organizer" className="block text-lg font-medium mb-2">Organizer:</label>
            <input type="text" id="organizer" name="organizer" value={eventData.organizer} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />
          </div>

          <div className="mb-4">
            <label htmlFor="start_date" className="block text-lg font-medium mb-2">Start Date:</label>
            <input type="date" id="start_date" name="start_date" value={eventData.start_date} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" required />
          </div>

          <div className="mb-4">
            <label htmlFor="finish_date" className="block text-lg font-medium mb-2">Finish Date:</label>
            <input type="date" id="finish_date" name="finish_date" value={eventData.finish_date} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" required />
          </div>

          <div className="mb-4">
            <label htmlFor="rating" className="block text-lg font-medium mb-2">Rating:</label>
            <input type="number" id="rating" name="rating" value={eventData.rating} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />
          </div>

          <div className="mb-4">
            <label htmlFor="total_participants" className="block text-lg font-medium mb-2">Total Participants:</label>
            <input type="number" id="total_participants" name="total_participants" value={eventData.total_participants} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />
          </div>

          <div className="mb-4">
            <label htmlFor="total_teams" className="block text-lg font-medium mb-2">Total Teams:</label>
            <input type="number" id="total_teams" name="total_teams" value={eventData.total_teams} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />
          </div>

          <button type="submit" className="w-full bg-black text-white py-2 rounded-lg font-bold text-lg mb-4">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;

