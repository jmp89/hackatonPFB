import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AdminPage from './pages/AdminPage';
import Home from './pages/Home';
import ResetPassword from './components/resetPassword';

const App = () => {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
    </AuthProvider>
  );
};

export default App;


