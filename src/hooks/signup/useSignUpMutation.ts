'use client';

import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { getStellaId } from '@/utils/stellaCalculator';

interface SignUpPayload {
  email: string;
  password: string;
  nickname: string;
  birth_date: string; // 선택한 생년월일
}

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: async ({ email, password, nickname, birth_date }: SignUpPayload) => {
      //  입력값 검증
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('유효하지 않은 이메일 형식입니다.');
      }
      if (password.length < 8) {
        throw new Error('비밀번호는 최소 8자 이상으로 입력해주세요.');
      }
      if (!nickname || nickname.trim().length === 0) {
        throw new Error('닉네임을 입력해주세요.');
      }
      if (!birth_date || isNaN(new Date(birth_date).getTime())) {
        throw new Error('유효한 생년월일을 입력해주세요.');
      }

      // Auth 사용자 등록
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

      const stellaId = getStellaId(new Date(birth_date)); // Date로 변환 후 전달

      // `users` 테이블에 추가 정보 저장
      const formattedBirthDate = new Date(birth_date).toISOString().split('T')[0];
      const { error: dbError } = await supabase.from('users').insert([
        {
          id: userId,
          nickname,
          birth_date: formattedBirthDate,
          stella_id: stellaId
        }
      ]);

      if (dbError) {
        throw new Error(dbError.message || '추가 정보를 저장하는 데 실패했습니다.');
      }

      return authData;
    },
    onSuccess: (data) => {
      console.log('회원가입 성공:', data);
      // 성공 상태 처리
    },
    onError: (error: Error) => {
      console.error('회원가입 실패:', error.message);
      // 에러 상태 처리
    }
  });
};
