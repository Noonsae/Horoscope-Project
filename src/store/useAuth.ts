import { User } from '@supabase/supabase-js';
import { create } from 'zustand';

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

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session })
}));

export default useAuthStore;
