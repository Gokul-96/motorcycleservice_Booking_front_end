const API_BASE_URL = 'https://motor-cycle-servicebooking-back-end.onrender.com/';

export const AuthService = {
  login: async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (error) {
          errorData = {};
        }

        throw new Error(errorData.error || 'Unknown error');
      }

      let data;
      try {
        data = await response.json();
      } catch (error) {
        data = 'not exist';
      }

      console.log('Data:', data);
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  signup: async (username, email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        return data; // Return the entire data object
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },
};