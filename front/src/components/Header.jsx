import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { token, removeToken } = useAuth();

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white text-black">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Abrir menú</span>
                            {!isOpen ? (
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
                            )}
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0">
                            <img
                                className="h-8 w-8"
                                src="/logo.svg"
                                alt="Hackaverse"
                            />
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                <NavLink
                                    to="/"
                                    className="text-black hover:bg-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Inicio
                                </NavLink>
                                {!token ? (
                                    <>
                                        <NavLink
                                            to="/users/login"
                                            className="text-black hover:bg-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                        >
                                            Identifícate
                                        </NavLink>
                                        <NavLink
                                            to="/register"
                                            className="text-black hover:bg-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                        >
                                            Regístrate
                                        </NavLink>
                                    </>
                                ) : (
                                    <>
                                        <NavLink
                                            to="/users/my-events"
                                            className="text-black hover:bg-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                        >
                                            Mis inscripciones
                                        </NavLink>

                                        <NavLink
                                            to="#"
                                            onClick={removeToken}
                                            className="text-black hover:bg-black hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                        >
                                            Cerrar sesión
                                        </NavLink>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menú móvil*/}
            {isOpen && (
                <div className="sm:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <NavLink
                            to="/"
                            className="text-black hover:bg-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                            Inicio
                        </NavLink>
                        {!token ? (
                            <>
                                <NavLink
                                    to="/users/login"
                                    className="text-black hover:bg-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Identifícate
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className="text-black hover:bg-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Regístrate
                                </NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink
                                    to="/users/my-events"
                                    className="text-black hover:bg-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Mis inscripciones
                                </NavLink>
                                <NavLink
                                    to="#"
                                    onClick={removeToken}
                                    className="text-black hover:bg-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Cerrar sesión
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;
