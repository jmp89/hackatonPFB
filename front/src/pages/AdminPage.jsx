import { useContext } from 'react';
import EventForm from '../components/EventForm';
import { AuthContext } from '../context/AuthContext';


const AdminPage = () => {
  const { user } = useContext(AuthContext)
  return (
    <>
      <EventForm token={user.token} />
    </>
  );
};

export default AdminPage;