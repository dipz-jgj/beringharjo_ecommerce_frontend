// Zustand untuk mengelola state management
import { create } from "zustand";
import { persist } from "zustand/middleware";
// import User from "./entities/User";

interface UserState {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  createdAt?: boolean;
}

interface AppQueryStore {
  userState: UserState;
  setUserState: (user: UserState) => void;
  clearUserState: () => void;
}

const useAppQueryStore = create<AppQueryStore>()(
  persist(
    (set) => ({
      userState: {},
      setUserState: (user) => set(() => ({ userState: { ...user } })),
      clearUserState: () => set(() => ({ userState: {} })),
    }),
    {
      name: "user-storage", // key untuk localStorage
      partialize: (state) => ({ userState: state.userState }), // hanya simpan userState
    }
  )
);

export default useAppQueryStore;
