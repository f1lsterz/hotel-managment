import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "../utils/types/user";

interface UserState {
  isAuth: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isAuth: false,
      user: null,
      login: (user) => set({ isAuth: true, user }),
      logout: () => set({ isAuth: false, user: null }),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({ isAuth: state.isAuth, user: state.user }),
    }
  )
);
