'use client';

import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

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

  const queryClient = useQueryClient();

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
    onSuccess: (data) => {
      const { session } = data;

      if (session) {
        document.cookie = `access_token=${session.access_token}; path=/; secure;`;
      }

      Swal.fire('로그인 성공', '정상적으로 로그인되었습니다.', 'success');
      queryClient.invalidateQueries('session'); // 세션 정보 갱신
      router.push('/');
    },

    // 실패 시 처리
    onError: (error: any) => {
      const errorMessage = error instanceof Error ? error.message : '로그인에 실패했습니다.';
      Swal.fire('오류 발생', errorMessage, 'error');
    }
  });
};

export default useSignInMutation;