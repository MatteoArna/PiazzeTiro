import React, { createContext, useState } from 'react';
import { login as loginService, logout as logoutService, getAuthToken, getUserEmail } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: getAuthToken() || null,
    email: getUserEmail() || null,
    
  });

  const login = (token, email) => {
    loginService(token, email);
    setAuth({ token, email });
  };

  const logout = () => {
    logoutService();
    setAuth({ token: null, email: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
