import useAuthStore from '@/store/useAuth';
import browserClient from '@/supabase/supabase';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

interface SignInPayload {
  email: string;
  password: string;
}

export const useSignInMutation = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const router = useRouter();

  return useMutation({
    mutationFn: async ({ email, password }: SignInPayload) => {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('유효하지 않은 이메일 형식입니다.');
      }
      if (password.length < 8) {
        throw new Error('비밀번호는 최소 8자 이상으로 입력력해주세요.');
      }

      const { data, error } = await browserClient.auth.signInWithPassword({
        email,
        password
      });
      if (error) {
        throw new Error(error.message);
      }
      return data.user;
    },
    onSuccess: (user) => {
      setUser(user);
      router.push('/');
    },
    onError: (error) => {
      Swal.fire('오류 발생', error.message || '로그인에 실패했습니다.', 'error');
    }
  });
};
