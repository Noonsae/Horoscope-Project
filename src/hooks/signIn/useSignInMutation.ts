// import { supabase } from '@/lib/supabase';
// // import useAuthStore from '@/store/useAuth';
// import { useMutation } from '@tanstack/react-query';
// import { useRouter } from 'next/navigation';
// import Swal from 'sweetalert2';

// interface SignInPayload {
//   email: string;
//   password: string;
// }

// export const useSignInMutation = () => {
//   // const setUser = useAuthStore((state) => state.setUser);
//   // const setSession = useAuthStore((state) => state.setSession);

//   const router = useRouter();

//   return useMutation({
//     mutationFn: async ({ email, password }: SignInPayload) => {
//       if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//         throw new Error('유효하지 않은 이메일 형식입니다.');
//       }
//       if (password.length < 8) {
//         throw new Error('비밀번호는 최소 8자 이상으로 입력력해주세요.');
//       }

//       const { data, error } = await supabase.auth.signInWithPassword({
//         email,
//         password
//       });
//       if (error) {
//         throw new Error(error.message);
//       }
//       return data;
//     },
//     onSuccess: (data) => {
//       const { user, session } = data;

//       if (user) setUser(user);
//       if (session) {
//         setSession({
//           accessToken: session.access_token,
//           refreshToken: session.refresh_token
//         });
//       }
//       setUser(user);
//       Swal.fire('로그인 성공', '로그인에 성공하였습니다.');
//       router.push('/');
//     },
//     onError: (error) => {
//       Swal.fire('오류 발생', error.message || '로그인에 실패했습니다.', 'error');
//     }
//   });
// };

import { supabase } from '@/lib/supabase';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

interface SignInPayload {
  email: string;
  password: string;
}

export const useSignInMutation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async ({ email, password }: SignInPayload) => {
      // 이메일 및 비밀번호 유효성 검증
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('유효한 이메일 형식이 아닙니다.');
      }
      if (password.length < 8) {
        throw new Error('비밀번호는 최소 8자 이상이어야 합니다.');
      }

      // Supabase 로그인 요청
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    onSuccess: (data) => {
      const { user, session } = data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('session', JSON.stringify(session));
      // 로그인 성공 알림
      console.log('로그인 성공. 세션 데이터:', data);
      Swal.fire('로그인 성공', '정상적으로 로그인되었습니다.', 'success');
      router.push('/');
    },
    onError: (error: any) => {
      // 로그인 실패 알림
      Swal.fire('오류 발생', error.message || '로그인에 실패했습니다.', 'error');
    }
  });
};
