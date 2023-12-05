import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Logic to handle login and set the user
    setUser(userData);
  };

  const logout = () => {
    // Logic to handle logout and clear the user
    setUser(null);
  };

  const isAuthenticated = () => {
    // Check if the user is authenticated (you might have a more complex check)
    return !!user;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};