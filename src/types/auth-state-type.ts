import { User } from './user-type';

export interface AuthState {
  isLogin: boolean;
  user: User | null;

  login: (email: string, password: string) => Promise<void>;
  updateProfile: (nickname?: string, profileImg?: string) => void;
  logout: () => void;
}
