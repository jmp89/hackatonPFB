import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import Home from './pages/HomePage';
import ResetPass from './components/resetPass';
import ActivationPage from './pages/ActivationPage'; 
import LoginFormPage from './pages/LoginFormPage';
import RegisterFormPage from './pages/RegisterFormPage';
import MyEventsPage from './pages/MyEventsPage';
import NotFound from './pages/NotFound';
import MainLayout from './layout/MainLayout';
import FAQPage from './pages/FAQPage';
import EventDetails from './pages/EventDetailsPage';
import EventSearchPage from './pages/EventSearchPage';
import ProfilePage from './pages/ProfilePage';
import './styles.css';
import EventConfirm from './components/EventConfirm';

const App = () => {
    return (
        <MainLayout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin/:eventId?" element={<AdminPage />} />
                <Route path="/register" element={<RegisterFormPage />} />
                <Route path="/reset-password" element={<ResetPass />} />
                <Route path="/users/validate/activate" element={<ActivationPage />} />
                <Route path="/users/login" element={<LoginFormPage />} />
                <Route path="/users/my-events" element={<MyEventsPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/event/search" element={<EventSearchPage />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/event/details/:eventId" element={<EventDetails />} />
                <Route path="/users/profile" element={<ProfilePage />} />
                <Route path="/event/confirm/:eventCode" element={<EventConfirm />} />
            </Routes>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </MainLayout>
    );
};

export default App;

