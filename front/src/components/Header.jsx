/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

// Icono del menú hamburguesa que cambia de estado abierto/cerrado
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

// Componente de ítem de navegación, se adapta a móvil y escritorio
const NavItem = ({ to, onClick, children, isMobile }) => (
    <NavLink
        to={to}
        onClick={onClick}
        className={`block px-4 py-2 rounded-md transition-colors duration-300 ${
            isMobile ? 'text-base' : 'text-sm'
        } hover:bg-gray-200`}
    >
        {children}
    </NavLink>
);

// Menú desplegable con transición (puede ser reutilizado para avatar y hamburguesa)
const DropdownMenu = ({ items, isOpen, toggleMenu, className }) => {
    return (
        <div
            className={`absolute right-0 mt-2 bg-white rounded-lg overflow-hidden transition-max-h duration-300 ease-in-out ${
                isOpen ? 'max-h-96 border border-gray-200 shadow-lg' : 'max-h-0'
            } ${className}`}
        >
            <ul className="py-1 w-44 space-y-1">
                {items.map((item, index) => (
                    <li key={index}>
                        {item.onClick ? (
                            <button
                                onClick={() => {
                                    item.onClick();
                                    toggleMenu();
                                }}
                                className="block w-full text-left px-4 py-2 rounded-md transition-colors duration-300 text-sm hover:bg-gray-200"
                            >
                                {item.icon ? (
                                    <img src={item.icon} alt={item.label} className="w-5 h-5 inline mr-2"/>
                                ) : (
                                    item.label
                                )}
                            </button>
                        ) : (
                            <NavItem to={item.to} onClick={toggleMenu} isMobile={item.isMobile}>
                                {item.label}
                            </NavItem>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Encabezado principal del sitio
const Header = () => {
    const { token, removeToken, currentUser } = useAuth();
    const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
    const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

    const toggleAvatarMenu = () => {
        setIsAvatarMenuOpen(!isAvatarMenuOpen);
        if (!isAvatarMenuOpen) {
            setIsHamburgerMenuOpen(false);
        }
    };

    const toggleHamburgerMenu = () => {
        setIsHamburgerMenuOpen(!isHamburgerMenuOpen);
        if (!isHamburgerMenuOpen) {
            setIsAvatarMenuOpen(false);
        }
    };

    const avatarUrl = currentUser && currentUser.avatar ? currentUser.avatar : '/userProfil.png';

    const avatarMenuItems = [
        { to: '/users/profile', label: 'Perfil' },
        { to: '/users/my-events', label: 'Mis inscripciones' },
        { to: '/users/rate-event', label: 'Valoraciones' },
        { onClick: removeToken, label: '', icon: '/public/power-icon.png' }, 
    ];

    const hamburgerMenuItems = token
        ? [
              { to: '/event/search', label: 'Eventos', isMobile: true },
              { to: '/faq', label: 'FAQ', isMobile: true },
          ]
        : [
              { to: '/users/login', label: 'Login', isMobile: true },
              { to: '/register', label: 'Registrarse', isMobile: true },
              { to: '/event/search', label: 'Eventos', isMobile: true },
              { to: '/faq', label: 'FAQ', isMobile: true },
          ];

    return (
        <header className="bg-white text-black sticky top-0 z-50 shadow-md h-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <NavLink to="/">
                            <img
                                className="h-24 w-auto"
                                src="/logo_hackaverse.svg"
                                alt="Hackaverse"
                            />
                        </NavLink>
                    </div>
                    <nav className="hidden sm:flex space-x-4">
                        {!token ? (
                            <>
                                <NavItem to="/users/login">Login</NavItem>
                                <NavItem to="/register">Registrarse</NavItem>
                                <NavItem to="/event/search">Eventos</NavItem>
                                <NavItem to="/faq">FAQ</NavItem>
                            </>
                        ) : (
                            <>
                                <NavItem to="/event/search" >Eventos</NavItem>
                                <NavItem to="/faq">FAQ</NavItem>
                                <div className="relative">
                                    <img
                                        className="w-10 h-10 rounded-full cursor-pointer"
                                        src={avatarUrl}
                                        alt="User Avatar"
                                        onClick={toggleAvatarMenu}
                                    />
                                    <DropdownMenu
                                        items={avatarMenuItems}
                                        isOpen={isAvatarMenuOpen}
                                        toggleMenu={toggleAvatarMenu}
                                        className="top-14"
                                    />
                                </div>
                            </>
                        )}
                    </nav>
                    {/* Menú móvil */}
                    <div className="sm:hidden flex items-center space-x-4 relative">
                        {token && (
                            <div className="relative">
                                <img
                                    className="w-10 h-10 rounded-full cursor-pointer"
                                    src={avatarUrl}
                                    alt="User Avatar"
                                    onClick={toggleAvatarMenu}
                                />
                                <DropdownMenu
                                    items={avatarMenuItems}
                                    isOpen={isAvatarMenuOpen}
                                    toggleMenu={toggleAvatarMenu}
                                    className="top-11"
                                />
                            </div>
                        )}
                        <button
                            onClick={toggleHamburgerMenu}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-300"
                            aria-controls="mobile-menu"
                            aria-expanded={isHamburgerMenuOpen}
                        >
                            <span className="sr-only">Abrir menú</span>
                            <MenuIcon isOpen={isHamburgerMenuOpen} />
                        </button>
                        <DropdownMenu
                            items={hamburgerMenuItems}
                            isOpen={isHamburgerMenuOpen}
                            toggleMenu={toggleHamburgerMenu}
                            className="top-11"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
