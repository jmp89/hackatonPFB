import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [ token, setToken ] = useState(localStorage.getItem("token") || null);

  return (
    <AuthContext.Provider value={{ token, setToken}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthProvider };