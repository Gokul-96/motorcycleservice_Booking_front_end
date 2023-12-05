//import instance from './instance';
import axios from "axios";

const getProfile = async (token) => {
  try {
    const config ={
        headers: { authorization: `${token}`}
    }
    console.log('Fetching user profile....');
    const response = await axios.get('https://motor-cycle-servicebooking-back-end.onrender.com/api/users/profile', config);
    return response.data
  } catch (error) {
    console.error('fetching user profile failed', error);
   
  }
};





export default {
  getProfile,
  
};