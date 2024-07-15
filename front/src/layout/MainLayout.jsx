/* eslint-disable react/prop-types */
import Header from '../components/Header.jsx';

const MainLayout = ({ children }) => {
    return (
        <>
            <Header />
            {children}
        </>
    );
};
export default MainLayout;
