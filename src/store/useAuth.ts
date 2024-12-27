import { User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Session {
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  session: Session | null;
  setAuth: (user: User | null, session: Session | null) => void;
  clearAuth: () => void;
}

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

