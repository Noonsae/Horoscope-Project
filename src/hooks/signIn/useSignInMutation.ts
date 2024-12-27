'use client';

import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import useAuthStore from '@/store/useAuth';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

interface SignInPayload {
  email: string;
  password: string;
}

export const useSignInMutation = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  const router = useRouter();

  return useMutation({
    mutationFn: async ({ email, password }: SignInPayload) => {
      // 통합된 supabase 사용 (클라이언트 환경에서 호출)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Supabase Error:', error);
        throw new Error(error.message || '로그인 실패');
      }

      if (!data.user) {
        console.error('Supabase Response:', data);
        throw new Error('유저 정보를 가져오지 못했습니다.');
      }
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('nickname, stella_id, birth_date ') // 필요한 필드 선택
        .eq('id', data.user.id) // 로그인된 사용자의 ID로 필터링
        .single(); // 단일 결과 가져오기

      if (userError) {
        console.error('Supabase Users Error:', userError);
        throw new Error(userError.message || '추가 사용자 정보를 가져오지 못했습니다.');
      }

      // 3. Zustand 상태 업데이트
      setAuth({
        id: data.user.id,
        nickname: userData.nickname, // `users` 테이블에서 가져온 nickname
        stella_id: userData.stella_id, // `users` 테이블에서 가져온 stella_id
        birth_date: userData.birth_date
      });

      return data.user;
    },
    onSuccess: () => {
      Swal.fire('로그인 성공', '환영합니다!', 'success'); // SweetAlert 알림
      router.push('/'); // 로그인 성공 후 루트 페이지로 이동
    },

    onError: (error: Error) => {
      console.error('로그인 실패:', error.message);
    }
  });
};
