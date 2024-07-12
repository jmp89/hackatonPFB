import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const EventForm = ({ token }) => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    name: '',
    technology: '',
    online_on_site: 'online',
    city: ' ',
    category: '',
    organizer: '',
    start_date: '',
    finish_date: '',
    description: ''
  });

  const [error, setError] = useState('');
  const [createOk, setCreateOk] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
        },
        body: JSON.stringify(eventData)
      });

      if (!response.ok) {
        throw new Error('Failed to save event');
      }

      const data = await response.json();
      console.log('Event saved successfully:', data);
      setCreateOk('Event saved successfully!');
      setError('');
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Error submitting form: ' + error.message);
      setCreateOk('');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData(prevData => { 
      const newData = {
        ...prevData,
      }
      newData[name] = value
      return newData
    });
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="absolute top-4 right-4 z-10">
        <FaHome
          className="text-black text-3xl cursor-pointer"
          onClick={() => navigate('/')}
        />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create New Hackathon</h2>

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

          {eventData.online_on_site === 'on_site' && (
            <div className="mb-4">
              <label htmlFor="city" className="block text-lg font-medium mb-2">City:</label>
              <input type="text" id="city" name="city" value={eventData.city} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" required />
            </div>
          )}

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
            <label htmlFor="description" className="block text-lg font-medium mb-2">Description:</label>
            <input type="text" id="description" name="description" value={eventData.description} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black" />
          </div>

          <button type="submit" className="w-full bg-black text-white py-2 rounded-lg font-bold text-lg mb-4">Submit</button>
        </form>

        {error && <div className="text-red-500 text-center mt-4">{error}</div>}
        {createOk && <div className="text-green-500 text-center mt-4">{createOk}</div>}
      </div>
    </div>
  );
};

export default EventForm;


