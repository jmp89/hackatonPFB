/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('currentUser')) || null);

    const updateToken = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    const removeToken = () => {
        setToken(null);
        localStorage.removeItem('token');
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
    };

    const updateCurrentUser = (newUser) => {
        setCurrentUser(newUser);
        localStorage.setItem('currentUser', JSON.stringify(newUser));
    };

    return (
        <AuthContext.Provider
            value={{ token, updateToken, removeToken, currentUser, updateCurrentUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export default AuthContext;
export { AuthProvider, useAuth };
