import { Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import Home from './pages/Home';
import RegisterFormPage from './pages/RegisterFormPage';
import ActivationFormPage from './components/ActivationFormPage';
import ActivationSuccessPage from './pages/ActivationSuccessPage';
import LoginFormPage from './pages/LoginFormPage';

import ResetPass from './components/resetPass';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/:eventId?" element={<AdminPage />} />
      <Route path="/register" element={<RegisterFormPage />} />
      <Route path="/reset-password" element={<ResetPass />} />
      <Route path='/users/validate/activate' element={<ActivationFormPage/>} />
      <Route path="/users/validate/activation-success" element={<ActivationSuccessPage />} />
      <Route path="/users/login" element={<LoginFormPage />} />
    </Routes>
  );
};

export default App;
