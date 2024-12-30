// store/useAuth.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 상태 관리에서 사용하는 사용자 타입 정의
interface User {
  id: string;
  nickname: string;
  stella_id: string;
  birth_date: string;
}

interface AuthState {
  isLoggedIn: boolean; // 로그인 여부
  user: User | null; // 사용자 정보
  setAuth: (user: User | null) => void; // 상태 업데이트 함수
  clearAuth: () => void; // 상태 초기화 함수
}

// Zustand 상태 정의
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      setAuth: (user) =>
        set(() => ({
          isLoggedIn: !!user, // user가 존재하면 true
          user
        })),
      clearAuth: () =>
        set(() => ({
          isLoggedIn: false,
          user: null
        }))
    }),
    {
      name: 'auth-storage' // 로컬 스토리지 키
    }
  )
);
export default useAuthStore;
