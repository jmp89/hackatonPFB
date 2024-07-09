import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    //   const [user, setUser] = useState(null);
    
    //!esto es de prueba despues se va a borrar, es solo para probar que va corresctamten
    const [user, setUser] = useState({
        name: 'Admin User',
        role: 'admin',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzIwNTIzNzAwLCJleHAiOjE3MjExMjg1MDB9.w9qQJ2KYpfhrXRz8od5L2bkaLPPVGCPeOxGsa7CMWrA', // Token simulado para administrador
    });


  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);

