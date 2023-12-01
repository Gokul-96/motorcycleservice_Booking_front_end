
import instance from '../services/instance';

const signup = async (credentials) => {
    try {
      console.log('Signing up user....');
      const response = await instance.authInstance.post('/users/signup', credentials);
      console.log('Signup successful');
      console.log(response.data.message);
      return response; // Make sure to return the response
    } catch (error) {
      console.error('signup failed', error);
      throw error; // Re-throw the error to handle it in the component
    }
  };

  const signin = async (credentials) => {
    try {
      console.log('Signing in user....');
      const response = await instance.authInstance.post('/users/signin', credentials);
      console.log('Signin successful', response.data);
      return response;
    } catch (error) {
      console.error('signin failed', error);
      throw error;
    }
  };

    export default {
        signup,
        signin
    };