import { create } from "zustand";
import axios from "axios";
import { LogOut } from "lucide-react";

axios.defaults.withCredentials = true; // connection with url
const API_URL = "http://localhost:5000/user"; // its url for signup n login

export const useAuthStore = create((set) => ({
  // Initial state
  user: null,
  isLoading: false,
  error: null,
  message: null,
  fetchingUser: true,

  // Functions
  Signup: async (username, email, password) => {
    set({
      isLoading: true,
      error: null,
      message: null,
    });

    try {
      const response = await axios.post(`${API_URL}/register`, {
        username,
        email,
        password,
      });

      set({
        user: response.data.user,
        message: response.data.message,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Error signing up",
      });

      throw error;
    }
  },
  login: async (username, password) => {
    set({
      isLoading: true,
      message: null,
      error: null,
    });

    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });

      const { user, message } = response.data;

      set({
        user,
        message,
        isLoading: false,
      });

      return { user, message };
    } catch (error) {
      set({
        isLoading: false,

        error: error.response?.data?.message || "Error Logging In",
      });

      throw error;
    }
  },

  fetchUser: async () => {
    set({ fetchingUser: true, error: null });

    try {
      const response = await axios.get(`${API_URL}/fetch-user`);

      set({ user: response.data.user, fetchingUser: false });
    } catch (error) {
      set({
        user: null,
        fetchingUser: false,

        error: null,
      });
    }
  },
  logout: async () => {
    set({ isLoading: true, error: null, message: null });

    try {
      const response = await axios.post(`${API_URL}/logout`);
      const { message } = response.data;
      set({
        message,
        isLoading: false,
        user: null,
        error: null,
      });
      return { message };
    } catch (error) {
      set({
        user: null,
        fetchingUser: false,
        isLoading: false,
        error: error.response?.data?.message || "Error Logging Out",
      });
      throw error;
    }
  },
}));
