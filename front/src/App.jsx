import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AdminPage from './pages/AdminPage';
import Home from './pages/Home';
import RegisterFormPage from './pages/RegisterFormPage';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/register" element={<RegisterFormPage />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
