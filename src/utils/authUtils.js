const getToken = () => {
   const user = sessionStorage.getItem ('loggedInUser');
   return user.token;
  };
  
  export default getToken;