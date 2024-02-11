import React, { createContext, useContext, useState,useEffect} from 'react';

//create context fn(shared context to use multiple components (deeply nested))
//Assume parent component here created state and variables and give to authcontext value
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [token, setToken] = useState(null);

  const getToken = () => {
    return token;
  };

  const contextValue = {
    token,
    setToken,
    getToken,
    
  };

  const signup = async (userData) => {
    
    try {
      // Make a request to the backend signup endpoint
      const response = await fetch('http://localhost:5000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(userData),
      });

      // Handle the response
      if (response.ok) {
        // If signup is successful, set the user profile
        const registeredUser = await response.json();
        setUserProfile(registeredUser);
        localStorage.setItem('loggedInUser', JSON.stringify(registeredUser));
        return registeredUser;
      } else {
        // If there's an error, throw an error with the response message
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      // Handle errors, e.g., display an error message to the user
      console.error('Signup failed:', error.message);
      throw error; // Rethrow the error to be caught by the component
    }
  };

  const signin = async (userData) => {
    console.log("userData:",userData)
    try {
      const token = getToken();
      console.log("token",token)
      const response = await fetch('http://localhost:5000/api/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
  
      
  
      if (response.ok) {
        const authenticatedUser = await response.json();
  
        // Handle the token here
       
        setToken(authenticatedUser.token);
  
        // Save user profile to state
        setUserProfile(authenticatedUser);
  
        // Save data to sessionStorage
        sessionStorage.setItem('loggedInUser', JSON.stringify(authenticatedUser));
  
        return authenticatedUser;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error('Signin failed:', error.message);
      throw error;
    }
  };

  const logout = () => {
    setUserProfile(null);
    setToken(null);
    sessionStorage.removeItem('loggedInUser');
  };
  const isAuthenticated = () => {
    // Check if the user is authenticated (you might have a more complex check)
    // (!!)Here,value into boolean expression
    return token !== null && token !== undefined;
  };

   // Check if the user is logged in from local storage on component mount
   useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    if (storedUser) {
      setUserProfile(storedUser);
      setToken(storedUser.token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userProfile, token,signup, signin, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};


//Assume child here we have used usecontext 
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};