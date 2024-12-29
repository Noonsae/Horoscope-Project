'use client';

import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import useAuthStore from '@/store/useAuth'; // Zustand 상태 가져오기
import { supabase } from '@/lib/supabase';

// SignInPayload 타입 정의
interface SignInPayload {
  email: string;
  password: string;
}

// SignInResult 타입 정의
interface SignInResult {
  user: Record<string, unknown> | null;
  session: Record<string, unknown> | null;
}

// 커스텀 Mutation Result 타입 정의
type CustomMutationResult = UseMutationResult<SignInResult, unknown, SignInPayload>;

const useSignInMutation = (): CustomMutationResult => {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth); // Zustand 상태 변경 함수 가져오기

  return useMutation<SignInResult, unknown, SignInPayload>({
    // 서버 액션 호출 함수
    mutationFn: async ({ email, password }: SignInPayload) => {
      const response = await fetch('/api/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const { errorMsg } = await response.json();
        throw new Error(errorMsg || '로그인에 실패했습니다.');
      }

      return response.json();
    },

    // 성공 시 처리
    onSuccess: async (data) => {
      const { session, user } = data;

      if (session) {
        document.cookie = `access_token=${session.access_token}; path=/; secure;`;
      }

      // Zustand 상태 업데이트
      if (user) {
        try {
          const { data: userDetails, error: userError } = await fetchUserDetails(user.id);
          if (userError) {
            throw new Error('유저 정보를 가져오는 중 오류가 발생했습니다.');
          }

          setAuth({
            id: user.id,
            nickname: userDetails.nickname || 'Guest',
            stella_id: userDetails.stella_id || '',
            birth_date: userDetails.birth_date || '',
            profile_img: userDetails.profile_img || DEFAULT_PROFILE_IMAGE
          });

          Swal.fire('로그인 성공', '정상적으로 로그인되었습니다.', 'success');
          router.push('/');
        } catch (error) {
          console.error('유저 정보 업데이트 실패:', error);
          Swal.fire('오류 발생', '유저 정보를 업데이트하지 못했습니다.', 'error');
        }
      }
    },

    // 실패 시 처리
    onError: (error: any) => {
      const errorMessage = error instanceof Error ? error.message : '로그인에 실패했습니다.';
      Swal.fire('오류 발생', errorMessage, 'error');
    }
  });
};

// 유저 상세 정보를 가져오는 함수
const fetchUserDetails = async (userId: string) => {
  const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();

  return { data, error };
};

export default useSignInMutation;
