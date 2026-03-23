import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',

  // Register user
  register: async (userData) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        set({
          user: response.data,
          isSuccess: true,
          isLoading: false,
          isError: false,
          message: ''
        });
      }
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      set({ isLoading: false, isError: true, message, isSuccess: false });
    }
  },

  // Login user
  login: async (userData) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${API_URL}/auth/login`, userData);
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        set({
          user: response.data,
          isSuccess: true,
          isLoading: false,
          isError: false,
          message: ''
        });
      }
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      set({ isLoading: false, isError: true, message, isSuccess: false });
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('user');
    set({ user: null, isError: false, isSuccess: false, isLoading: false, message: '' });
  },

  // Reset state
  resetAuthStatus: () => {
    set({ isError: false, isSuccess: false, isLoading: false, message: '' });
  }
}));

export default useAuthStore;
