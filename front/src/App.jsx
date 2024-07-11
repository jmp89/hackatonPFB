import { Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import Home from './pages/Home';
import ResetPass from './components/resetPass';

import RegisterFormPage from './pages/RegisterFormPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/:eventId?" element={<AdminPage />} />
      <Route path="/register" element={<RegisterFormPage />} />
      <Route path="/reset-password" element={<ResetPass />} />
    </Routes>
  );
};

export default App;
