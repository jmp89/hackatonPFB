/* eslint-disable react/prop-types */
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const MainLayout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
};
export default MainLayout;
