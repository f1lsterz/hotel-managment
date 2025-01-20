import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Role } from "../utils/types/user";

interface UserState {
  isAuth: boolean;
  role: Role | null;
  login: (role: Role) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useUserStore = create<UserState>()(
  persist((set) => ({
    isAuth: false,
    role: null,
    login: (role) => set({ isAuth: true, role }),
    logout: () => set({ isAuth: false, role: null }),
  }))
);
