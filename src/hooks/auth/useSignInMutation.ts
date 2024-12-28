import { supabase } from '@/lib/supabase';
import { User } from '@/types/supabase';
import { Session } from '@/types/zustand-type/auth-state-type';
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
type CustomMutationResult = UseMutationResult<SignInResult, unknown, SignInPayload> & {
  isLoading: boolean; // 추가된 isLoading 상태
};

// useSignInMutation 훅 구현
export const useSignInMutation = (): CustomMutationResult => {
  const router = useRouter();

  const mutation = useMutation<SignInResult, unknown, SignInPayload>({
    // 로그인 요청 함수
    mutationFn: async ({ email, password }: SignInPayload) => {
      // 이메일 유효성 검증
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('유효한 이메일 형식이 아닙니다.');
      }

      // 비밀번호 길이 검증
      if (password.length < 8) {
        throw new Error('비밀번호는 최소 8자 이상이어야 합니다.');
      }

      // Supabase를 통한 로그인 요청
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      // 로그인 실패 처리
      if (error) {
        throw new Error(error.message);
      }

      return data;
    },

    // 성공 시 처리
    onSuccess: (data) => {
      const { user, session } = data;

      // 사용자와 세션 정보를 로컬 스토리지에 저장
      if (user) localStorage.setItem('user', JSON.stringify(user));
      if (session) localStorage.setItem('session', JSON.stringify(session));
      
      // 성공 알림
      Swal.fire('로그인 성공', '정상적으로 로그인되었습니다.', 'success');

      // 홈 페이지로 이동
      router.push('/');
    },

    // 실패 시 처리
    onError: (error: any) => {
      // 실패 알림
      Swal.fire('오류 발생', error.message || '로그인에 실패했습니다.', 'error');
    }
  });

  // 확장된 반환 객체
  return {
    ...mutation,
    isLoading: mutation.isLoading // isLoading 포함
  };
};
