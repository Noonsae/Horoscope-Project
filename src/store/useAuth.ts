import { supabase } from '@/lib/supabase';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const DEFAULT_PROFILE_IMAGE =
  'https://qxytgvrleqpskxcfuvja.supabase.co/storage/v1/object/public/profile_images/default_profile_img.webp';

interface User {
  id: string;
  nickname: string;
  stella_id: string;
  birth_date: string;
  profile_img?: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  setAuth: (user: User | null) => void;
  clearAuth: () => void;
  fetchAndSetAuth: () => Promise<void>; // Supabase에서 유저 정보 가져오기
  updateProfile: (nickname: string, profile_img: string) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,

      // 상태에 유저 정보 설정
      setAuth: (user) =>
        set(() => ({
          isLoggedIn: !!user,
          user
        })),

      // 상태 초기화
      clearAuth: () =>
        set(() => ({
          isLoggedIn: false,
          user: null
        })),

      // Supabase에서 유저 정보 가져오기
      fetchAndSetAuth: async () => {
        try {
          const { data, error } = await supabase.auth.getUser();

          if (error) {
            console.error('유저 정보 가져오기 실패:', error);
            return;
          }

          const supabaseUser = data?.user;

          if (!supabaseUser) {
            console.warn('로그인된 유저가 없습니다.');
            return;
          }

          const { data: userDetails, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', supabaseUser.id)
            .single();

          if (userError) {
            console.error('유저 상세 정보 가져오기 실패:', userError);
            return;
          }

          // Zustand 상태 업데이트
          set({
            isLoggedIn: true,
            user: {
              id: supabaseUser.id,
              nickname: userDetails.nickname || 'Guest',
              stella_id: userDetails.stella_id || '',
              birth_date: userDetails.birth_date || '',
              profile_img: userDetails.profile_img || DEFAULT_PROFILE_IMAGE
            }
          });
        } catch (fetchError) {
          console.error('fetchAndSetAuth -> 실패:', fetchError);
        }
      },

      // 프로필 업데이트
      updateProfile: (nickname, profile_img) =>
        set((state) => ({
          user: state.user
            ? {
                ...state.user,
                nickname,
                profile_img
              }
            : null
        }))
    }),
    {
      name: 'auth-storage' // 로컬 스토리지 키
    }
  )
);

export default useAuthStore;
