import { Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import Home from './pages/Home';
import RegisterFormPage from './pages/RegisterFormPage';
import ActivationSuccessPage from './pages/ActivationSuccessPage';

import ResetPass from './components/resetPass';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/:eventId?" element={<AdminPage />} />
      <Route path="/register" element={<RegisterFormPage />} />
      <Route path="/reset-password" element={<ResetPass />} />
      <Route path="/users/validate" element={<ActivationSuccessPage />} />
    </Routes>
  );
};

export default App;
