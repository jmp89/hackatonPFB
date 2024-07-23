/* eslint-disable react/prop-types */
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const MainLayout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
            <Footer/>
        </>
    );
};
export default MainLayout;
