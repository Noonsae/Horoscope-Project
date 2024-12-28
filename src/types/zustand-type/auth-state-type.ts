import { User } from '@/types/supabase';

export interface Session {
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  session: Session | null;
  setAuth: (user: User | null, session: Session | null) => void;
  clearAuth: () => void;
}
