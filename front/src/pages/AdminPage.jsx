import { useAuth } from '../context/AuthContext';
import EventForm from '../components/EventForm';

const AdminPage = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') {
    return <p>Acceso denegado</p>;
  }

  return (
    <div>
      <h1>Panel de Administración</h1>
      <EventForm token={user.token} /> 
    </div>
  );
};

export default AdminPage;


