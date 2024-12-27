import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { AuthState } from '@/types/zustand-type/auth-state-type';

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      session: null,
      setAuth: (user, session) =>
        set(() => ({
          isLoggedIn: !!user,
          user,
          session
        })),
      clearAuth: () =>
        set(() => ({
          isLoggedIn: false,
          user: null,
          session: null
        }))
    }),
    {
      name: 'auth-storage' // 로컬 스토리지 키
    }
  )
);
export default useAuthStore;
