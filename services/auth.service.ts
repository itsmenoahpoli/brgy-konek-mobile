import api from '../api';

const authService = {
  login: async (email: string, password: string) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      console.log(res);
      return res.data;
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  },
  register: async (data: any) => {
    try {
      const res = await api.post('/auth/register', data);
      console.log(res);
      return res.data;
    } catch (err: any) {
      console.log(err);
      let errorMessage = 'Registration failed. Please try again.';

      if (err?.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err?.response?.status === 422) {
        errorMessage = 'Please check your input data and try again.';
      } else if (err?.response?.status === 409) {
        errorMessage = 'An account with this email already exists.';
      } else if (err?.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (err?.code === 'NETWORK_ERROR' || err?.code === 'ECONNABORTED') {
        errorMessage = 'Network error. Please check your connection.';
      }

      const formattedError = {
        message: errorMessage,
        originalError: err,
      };

      throw formattedError;
    }
  },
};

export default authService;
