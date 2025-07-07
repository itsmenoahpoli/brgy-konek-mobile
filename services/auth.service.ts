import api from '../api';
import { authStorage } from '../utils/storage';
import Toast from 'react-native-toast-message';

const authService = {
  login: async (email: string, password: string) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      console.log(res);

      if (res.data && res.data.token) {
        await authStorage.saveAuthData(res.data.token, res.data.user || res.data);
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: 'Welcome back!',
        });
      }

      return res.data;
    } catch (err: any) {
      console.log(err);
      let errorMessage = 'Login failed. Please try again.';

      if (err?.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err?.response?.status === 401) {
        errorMessage = 'Invalid email or password.';
      } else if (err?.response?.status === 422) {
        errorMessage = 'Please check your input data and try again.';
      } else if (err?.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (err?.code === 'NETWORK_ERROR' || err?.code === 'ECONNABORTED') {
        errorMessage = 'Network error. Please check your connection.';
      }

      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: errorMessage,
      });

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
  logout: async () => {
    try {
      await authStorage.clearAuthData();
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  },
  forgotPassword: async (email: string) => {
    try {
      const res = await api.post('/auth/forgot-password', { email });
      console.log(res);

      Toast.show({
        type: 'success',
        text1: 'Reset Email Sent',
        text2: 'Please check your email for password reset instructions.',
      });

      return res.data;
    } catch (err: any) {
      console.log(err);
      let errorMessage = 'Failed to send reset email. Please try again.';

      if (err?.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err?.response?.status === 404) {
        errorMessage = 'Email address not found. Please check your email.';
      } else if (err?.response?.status === 422) {
        errorMessage = 'Please enter a valid email address.';
      } else if (err?.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (err?.code === 'NETWORK_ERROR' || err?.code === 'ECONNABORTED') {
        errorMessage = 'Network error. Please check your connection.';
      }

      Toast.show({
        type: 'error',
        text1: 'Reset Failed',
        text2: errorMessage,
      });

      throw err;
    }
  },
  verifyOTP: async (otp: string) => {
    try {
      const res = await api.post('/auth/verify-otp', { otp });
      console.log(res);

      Toast.show({
        type: 'success',
        text1: 'OTP Verified',
        text2: 'Your account has been verified successfully.',
      });

      return res.data;
    } catch (err: any) {
      console.log(err);
      let errorMessage = 'OTP verification failed. Please try again.';

      if (err?.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err?.response?.status === 400) {
        errorMessage = 'Invalid OTP. Please check and try again.';
      } else if (err?.response?.status === 422) {
        errorMessage = 'Please enter a valid 6-digit OTP.';
      } else if (err?.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (err?.code === 'NETWORK_ERROR' || err?.code === 'ECONNABORTED') {
        errorMessage = 'Network error. Please check your connection.';
      }

      Toast.show({
        type: 'error',
        text1: 'Verification Failed',
        text2: errorMessage,
      });

      throw err;
    }
  },
  resendOTP: async () => {
    try {
      const res = await api.post('/auth/resend-otp');
      console.log(res);

      Toast.show({
        type: 'success',
        text1: 'OTP Resent',
        text2: 'A new verification code has been sent to your email.',
      });

      return res.data;
    } catch (err: any) {
      console.log(err);
      let errorMessage = 'Failed to resend OTP. Please try again.';

      if (err?.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err?.response?.status === 429) {
        errorMessage = 'Too many requests. Please wait before trying again.';
      } else if (err?.response?.status === 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (err?.code === 'NETWORK_ERROR' || err?.code === 'ECONNABORTED') {
        errorMessage = 'Network error. Please check your connection.';
      }

      Toast.show({
        type: 'error',
        text1: 'Resend Failed',
        text2: errorMessage,
      });

      throw err;
    }
  },
};

export default authService;
