import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import ResetPass from './pages/resetPass';
import ActivationPage from './pages/ActivationPage'; 
import LoginFormPage from './pages/LoginFormPage';
import RegisterFormPage from './pages/RegisterFormPage';
import NotFound from './pages/NotFound';
import MainLayout from './layout/MainLayout';
import FAQPage from './pages/FAQPage';
import EventDetails from './pages/EventDetailsPage';
import EventSearchPage from './pages/EventSearchPage';
import ProfilePage from './pages/ProfilePage';
import ActivationEventPage from "./pages/ActivationEventPage"
import CreateEventPage from './pages/CreateEventPage';
import EditEventPage from './pages/EditEventPage';
import EventResultsPage from './pages/EventResultsPage';
import InsertEventResultsPage from './pages/InsertEventResultsPage';
import './styles.css';

const App = () => {
    return (
        <MainLayout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<RegisterFormPage />} />
                <Route path="/reset-password" element={<ResetPass />} />
                <Route path="/users/validate/activate" element={<ActivationPage />} />
                <Route path="/users/login" element={<LoginFormPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/event/search" element={<EventSearchPage />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/event/details/:eventId" element={<EventDetails />} />
                <Route path="/users/profile" element={<ProfilePage />} />
                <Route path='/event/validate/activate' element={<ActivationEventPage />}/>
                <Route path="/event/create" element={<CreateEventPage />} />
                <Route path="/event/edit/:eventID" element={<EditEventPage />} />
                <Route path="/event/results" element={<EventResultsPage />} />
                <Route path="/event/insert-results/:eventID" element={<InsertEventResultsPage />} />
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

