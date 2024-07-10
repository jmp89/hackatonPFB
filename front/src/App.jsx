import { Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import Home from './pages/Home';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/:eventId?" element={<AdminPage />} />
    </Routes>
  );
};

export default App;



