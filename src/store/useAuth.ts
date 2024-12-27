import { User } from '@supabase/ssr';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Session {
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
}

const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      session: null,
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session })
    }),
    {
      name: 'auth-storage' // 로컬 스토리지 키
    }
  )
);
export default useAuthStore;

