import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AdminPage from './pages/AdminPage';
import Home from './pages/Home';
import ResetPass from './components/resetPass';

const App = () => {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/reset-password" element={<ResetPass />} />
        </Routes>
    </AuthProvider>
  );
};

export default App;


