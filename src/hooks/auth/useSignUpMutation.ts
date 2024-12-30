'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

// 회원가입 요청에 사용할 데이터 타입 정의
interface SignUpPayload {
  email: string;
  password: string;
  nickname: string;
  birth_date: string;
}

// useSignUpMutation 훅 구현
const useSignUpMutation = () => {
  const router = useRouter();

  return useMutation({
    // 회원가입 요청 함수
    mutationFn: async (payload: SignUpPayload) => {
      const response = await fetch('/api/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const { errorMsg } = await response.json();
        throw new Error(errorMsg || '회원가입에 실패했습니다.');
      }

      return response.json();
    },

    // 성공 시 처리
    onSuccess: async () => {
      await Swal.fire('회원가입 성공', '환영합니다!', 'success');
      router.push('/sign-in');
    },

    // 실패 시 처리
    onError: (error: any) => {
      const errorMessage = error instanceof Error ? error.message : '회원가입에 실패했습니다.';
      Swal.fire('회원가입 실패', errorMessage, 'error');
    }
  });
};

export default useSignUpMutation;
