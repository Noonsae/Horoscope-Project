'use client';
import supabase from '@/supabase/supabase';
import { useMutation } from '@tanstack/react-query';

interface SignUpPayload {
  email: string;
  password: string;
  nickname: string;
  birth_date: Date; // 선택한 생년월일
}

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: async ({ email, password, nickname, birth_date }: SignUpPayload) => {
      // 1. Supabase Auth 사용자 등록
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { nickname } }
      });

      if (authError) {
        throw new Error(authError.message || '회원가입에 실패하였습니다. 다시 확인해 주세요.');
      }

      const userId = authData.user?.id;
      if (!userId) {
        throw new Error('유저 ID를 생성하지 못했습니다.');
      }

      // 2. `users` 테이블에 추가 정보 저장
      const { error: dbError } = await supabase.from('users').insert([
        {
          id: userId, // Auth의 user.id
          email, // 사용자 이메일
          nickname, // 닉네임
          birth_date // 생년월일
        }
      ]);

      if (dbError) {
        throw new Error(dbError.message || '추가 정보를 저장하는 데 실패했습니다.');
      }

      return authData;
    }
  });
};
