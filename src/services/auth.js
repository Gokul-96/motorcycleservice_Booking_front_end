import instance from '../services/instance';


const signup = async (credentials) => {
  try {
    console.log('Signing up user....');
    const response = await instance.authInstance.post('/users/signup', credentials);
    console.log('Signup successful');
    console.log(response.data.message);
    
  } catch (error) {
    console.error('signup failed', error);
   
  }
};

const signin = async (credentials, options = {}) => {
  try {
    console.log('Signing in user....');
    const response = await instance.authInstance.post('/users/signin', credentials);
    
    console.log('Signin Successfull');
 


    //after a successfull signin
    //store the token in the session storage
    sessionStorage.setItem('loggedInUser',
    JSON.stringify(response.data));
    return response.data;

    
  } catch (error) {
    return null;
    console.error('signin failed', error);

  }
};

export default {
  signup,
  signin,
};