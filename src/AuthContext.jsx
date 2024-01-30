import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);

  const login = (userData) => {
    // Logic to handle login and set the user
    setUserProfile(userData);
  };

  const logout = () => {
    // Logic to handle logout and clear the user
    setUserProfile(null);
  };
  const isAuthenticated = () => {
    // Check if the user is authenticated (you might have a more complex check)
    // (!!)Here,value into boolean expression
    return !!userProfile && !!userProfile.user && !!userProfile.user.username;
  };

  return (
    <AuthContext.Provider value={{ userProfile, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};