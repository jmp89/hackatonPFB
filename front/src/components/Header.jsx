import { NavLink } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const MenuIcon = ({ isOpen }) => (
    !isOpen ? (
        <svg
            className="block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
            />
        </svg>
    ) : (
        <svg
            className="block h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    )
);

const NavItem = ({ to, onClick, children, className, isMobile }) => (
    <NavLink
        to={to}
        onClick={onClick}
        className={`${className} px-4 py-2 rounded-md transition-colors duration-300 ${isMobile ? 'text-base font-medium' : 'text-lg font-semibold'}`}
    >
        {children}
    </NavLink>
);

const Header = () => {
    const { token, removeToken } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <header className="bg-white text-black sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <img
                            className="h-48 w-48"
                            src="/logo_hackaverse.svg"
                            alt="Hackaverse"
                        />
                    </div>
                    <nav className="hidden sm:flex sm:space-x-6">
                        <NavItem to="/" className="text-black hover:bg-black hover:text-white">
                            Inicio
                        </NavItem>
                        {!token ? (
                            <>
                                <NavItem to="/users/login" className="text-black hover:bg-black hover:text-white">
                                    Login
                                </NavItem>
                                <NavItem to="/register" className="text-black hover:bg-black hover:text-white">
                                    Regístrate
                                </NavItem>
                            </>
                        ) : (
                            <>
                                <NavItem to="/users/my-events" className="text-black hover:bg-black hover:text-white">
                                    Mis inscripciones
                                </NavItem>
                                <NavItem to="#" onClick={removeToken} className="text-black hover:bg-black hover:text-white">
                                    Cerrar sesión
                                </NavItem>
                            </>
                        )}
                    </nav>
                    <div className="sm:hidden">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-300"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">Abrir menú</span>
                            <MenuIcon isOpen={isOpen} />
                        </button>
                    </div>
                </div>
            </div>

            <nav ref={menuRef} className={`sm:hidden absolute top-20 right-0 bg-white z-50 border border-gray-200 opacity-0 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto w-64' : 'opacity-0 pointer-events-none w-0'}`}>
                <ul className={`px-2 pt-2 pb-3 space-y-6 ${isOpen ? 'block' : 'hidden'}`}>
                    <li className='mt-2'>
                        <NavItem to="/" onClick={toggleMenu} className="text-black hover:bg-black hover:text-white text-base font-medium" isMobile>
                            Inicio
                        </NavItem>
                    </li>
                    {!token ? (
                        <>
                            <li>
                                <NavItem to="/users/login" onClick={toggleMenu} className="text-black hover:bg-black hover:text-white text-base font-medium" isMobile>
                                    Login
                                </NavItem>
                            </li>
                            <li>
                                <NavItem to="/register" onClick={toggleMenu} className="text-black hover:bg-black hover:text-white text-base font-medium" isMobile>
                                    Regístrate
                                </NavItem>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavItem to="/users/my-events" onClick={toggleMenu} className="text-black hover:bg-black hover:text-white text-base font-medium" isMobile>
                                    Mis inscripciones
                                </NavItem>
                            </li>
                            <li>
                                <NavItem to="#" onClick={() => { removeToken(); toggleMenu(); }} className="text-black hover:bg-black hover:text-white text-base font-medium" isMobile>
                                    Cerrar sesión
                                </NavItem>
                            </li>
                        </>
                    )}
                    <li className='mt-2'>
                        <NavItem to="/" onClick={toggleMenu} className="text-black hover:bg-black hover:text-white text-base font-medium" isMobile>
                            Hackatones
                        </NavItem>
                    </li>
                    <li className='mt-2'>
                        <NavItem to="/" onClick={toggleMenu} className="text-black hover:bg-black hover:text-white text-base font-medium" isMobile>
                            Preguntas frecuentes
                        </NavItem>
                    </li>
                    <li className='mt-2'>
                        <NavItem to="/" onClick={toggleMenu} className="text-black hover:bg-black hover:text-white text-base font-medium" isMobile>
                            Cerrar sesión
                        </NavItem>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
