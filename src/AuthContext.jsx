import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const isAuthenticated = () => {
    return user !== null;
  };

  const login = (userData) => {
    // Perform login logic, e.g., making API requests
    // If login is successful, set the user data
    setUser(userData);
    // You might also want to store the user data in localStorage or as a cookie
    // localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    // Perform logout logic, e.g., making API requests to invalidate tokens
    // Clear the user data
    setUser(null);
    // You might also want to remove the user data from localStorage or cookies
    // localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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