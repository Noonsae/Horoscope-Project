import { supabase } from '@/lib/supabase';
import { User, Session, AuthResponse } from '@supabase/supabase-js';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

// SignInPayload 타입 정의
interface SignInPayload {
  email: string;
  password: string;
}

// Supabase에서 반환되는 데이터 타입 정의
interface SignInResult {
  user: User | null;
  session: Session | null;
}

// 커스텀 Mutation Result 타입 확장
type CustomMutationResult = UseMutationResult<SignInResult, unknown, SignInPayload>;

// useSignInMutation 훅 구현
export const useSignInMutation = (): CustomMutationResult => {
  const router = useRouter();

  const mutation = useMutation<SignInResult, unknown, SignInPayload>({
    // 로그인 요청 함수
    mutationFn: async ({ email, password }: SignInPayload) => {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('유효한 이메일 형식이 아닙니다.');
      }

      if (password.length < 8) {
        throw new Error('비밀번호는 최소 8자 이상이어야 합니다.');
      }

      const { data, error }: AuthResponse = await supabase.auth.signInWithPassword({ email, password });

      if (error || !data.user || !data.session) {
        throw new Error(error?.message || '로그인에 실패했습니다.');
      }

      return data;
    },

    // 성공 시 처리
    onSuccess: (data) => {
      const { user, session } = data;

      if (user) localStorage.setItem('user', JSON.stringify(user));
      if (session) localStorage.setItem('session', JSON.stringify(session));

      Swal.fire('로그인 성공', '정상적으로 로그인되었습니다.', 'success');
      router.push('/');
    },

    // 실패 시 처리
    onError: (error: any) => {
      const errorMessage = error instanceof Error ? error.message : '로그인에 실패했습니다.';
      Swal.fire('오류 발생', errorMessage, 'error');
    }
  });

  return mutation;
};
