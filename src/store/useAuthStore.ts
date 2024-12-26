import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import clientSupabase from '@/lib/supabase-client';
import { AuthState } from '@/types/auth-state-type';
import { User } from '@/types/user-type';

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLogin: false,
      user: null,

      // 이메일/비밀번호 로그인
      login: async (email: string, password: string) => {
        try {
          // Supabase 로그인 요청
          const { data: authData, error } = await clientSupabase.auth.signInWithPassword({
            email,
            password
          });

          if (error) {
            throw new Error(`로그인 실패: ${error.message}`);
          }

          const user = authData.user;

          if (!user) {
            throw new Error('로그인에 실패했습니다.');
          }

          // users 테이블에서 닉네임, 프로필 사진 가져오기
          const { data, error: userError } = await clientSupabase
            .from('users')
            .select('id, nickname, profile_image_url')
            .eq('email', email)
            .single();

          if (userError) {
            throw new Error(`유저 정보 조회 실패: ${userError.message}`);
          }

          if (!data) {
            throw new Error('사용자 데이터를 찾을 수 없습니다.');
          }

          // 상태 업데이트
          set(() => ({
            isLogin: true,
            user: {
              id: data.id,
              email: user.email || '',
              nickname: data.nickname || '',
              profile_img: data.profile_image_url || ''
            }
          }));
        } catch (error: any) {
          console.error('로그인 중 오류 발생:', error);
          throw new Error('로그인에 실패했습니다. 다시 시도해주세요.');
        }
      },

      // 프로필 업데이트
      updateProfile: (nickname?: string, profileImg?: string) => {
        set((state) => ({
          user: {
            ...state.user,
            nickname: nickname || state.user?.nickname || '',
            profile_image_url: profileImg || state.user?.profile_img || ''
          } as User
        }));
      },

      // 로그아웃
      logout: () => {
        // 상태 초기화
        set(() => ({
          isLogin: false,
          user: null
        }));

        localStorage.clear();
      }
    }),
    { name: 'auth', partialize: (state) => ({ isLogin: state.isLogin, user: state.user }) }
  )
);

export default useAuthStore;
