import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Helper to get token
const getConfig = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
  }
  return {};
};

const useTaskStore = create((set, get) => ({
  tasks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',

  // Create new task
  createTask: async (taskData) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${API_URL}/tasks`, taskData, getConfig());
      set((state) => ({
        tasks: [response.data, ...state.tasks],
        isSuccess: true,
        isLoading: false,
        isError: false,
      }));
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      set({ isLoading: false, isError: true, message, isSuccess: false });
    }
  },

  // Get user tasks
  getTasks: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${API_URL}/tasks`, getConfig());
      set({
        tasks: response.data,
        isSuccess: true,
        isLoading: false,
        isError: false,
      });
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      set({ isLoading: false, isError: true, message, isSuccess: false });
    }
  },

  // Update a task
  updateTask: async (id, taskData) => {
    set({ isLoading: true });
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}`, taskData, getConfig());
      set((state) => ({
        tasks: state.tasks.map((task) => (task._id === id ? response.data : task)),
        isSuccess: true,
        isLoading: false,
        isError: false,
      }));
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      set({ isLoading: false, isError: true, message, isSuccess: false });
    }
  },

  // Delete user task
  deleteTask: async (id) => {
    set({ isLoading: true });
    try {
      await axios.delete(`${API_URL}/tasks/${id}`, getConfig());
      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== id),
        isSuccess: true,
        isLoading: false,
        isError: false,
      }));
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      set({ isLoading: false, isError: true, message, isSuccess: false });
    }
  },

  // Reset state
  resetTaskStatus: () => {
    set({ isError: false, isSuccess: false, isLoading: false, message: '' });
  },
  
  // Clear tasks (useful on logout)
  clearTasks: () => {
    set({ tasks: [] });
  }
}));

export default useTaskStore;
