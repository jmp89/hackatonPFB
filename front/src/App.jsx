import { Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import Home from './pages/HomePage';
import ResetPass from './components/resetPass';
import ActivationSuccessPage from './pages/ActivationSuccessPage';
import ActivationFormPage from './components/ActivationFormPage';
import LoginFormPage from './pages/LoginFormPage';
import RegisterFormPage from './pages/RegisterFormPage';
import MyEventsPage from './pages/MyEventsPage';
import NotFound from './pages/NotFound';
import MainLayout from './layout/MainLayout';
import FAQPage from './pages/FAQPage';
import RateEventPage from './pages/RateEventPage';
import EventDetails from './pages/EventDetailsPage';
import EventSearchPage from './pages/EventSearchPage';
import './styles.css';


const App = () => {
    return (
        <MainLayout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin/:eventId?" element={<AdminPage />} />
                <Route path="/register" element={<RegisterFormPage />} />
                <Route path="/reset-password" element={<ResetPass />} />
                <Route path="/users/validate/activate" element={<ActivationFormPage />} />
                <Route path="/users/validate/activation-success" element={<ActivationSuccessPage />} />
                <Route path="/users/login" element={<LoginFormPage />} />
                <Route path="/users/rate-event" element={<RateEventPage />} />
                <Route path="/users/my-events" element={<MyEventsPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/event/search" element={<EventSearchPage />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/event/details/:eventId" element={<EventDetails />} />

            </Routes>
        </MainLayout>
    );
};

export default App;
