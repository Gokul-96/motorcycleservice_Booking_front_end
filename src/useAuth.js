import { useEffect, useState } from 'react';
import auth from './services/auth' 

const useAuth = () => {
    const [user, setUser] = useState(null);
  
    const signIn = async (credentials) => {
      const userData = await auth.signin(credentials);
  
      if (userData) {
        setUser(userData);
      }
  
      return userData;
    };
  
    const signOut = () => {
      localStorage.removeItem('loggedInUser');
      setUser(null);
    };
  
    useEffect(() => {
      console.log('Running useAuth useEffect');
  
      const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
      console.log('Stored User:', storedUser);
  
      if (storedUser) {
        setUser(storedUser);
      }
    }, []);
  
    console.log('Returning from useAuth:', user);
  
    return { user, signIn, signOut };
  };
  
  export default useAuth;