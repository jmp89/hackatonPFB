import { Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import Home from './pages/Home';
import RegisterFormPage from './pages/RegisterFormPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/:eventId?" element={<AdminPage />} />
      <Route path="/register" element={<RegisterFormPage />} />
    </Routes>
  );
};

export default App;
