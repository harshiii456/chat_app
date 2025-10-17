import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSignedUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({authUser: res.data})
    } catch (error) {
      console.error("Error in checking auth:", error);
      set({authUser: null})
    }finally {
      set({isCheckingAuth: false})
    }
  },

  signUp: async (data) => {

  }
}))