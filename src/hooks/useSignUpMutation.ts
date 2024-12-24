'use client';

import browserClient from '@/supabase/supabase';
import { useMutation } from '@tanstack/react-query';
import { useStellasMutation } from './useStellasMutations';
import { getStellaId } from './useStellaHelpers';

interface Stella {
  id: string;
  name: string;
  birth_data: string;
}

interface SignUpPayload {
  email: string;
  password: string;
  nickname: string;
  birth_date: Date; // 선택한 생년월일
}

export const useSignUpMutation = () => {
  // const fetchStellas = useStellasMutation();
  return useMutation({
    mutationFn: async ({ email, password, nickname, birth_date }: SignUpPayload) => {
      //  Supabase Auth 사용자 등록
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('유효하지 않은 이메일 형식입니다.');
      }
      if (password.length < 8) {
        throw new Error('비밀번호는 최소 8자 이상으로 입력력해주세요.');
      }
      if (!nickname || nickname.trim().length === 0) {
        throw new Error('닉네임을 입력해주세요.');
      }
      if (!birth_date || isNaN(new Date(birth_date).getTime())) {
        throw new Error('유효한 생년월일을 입력해주세요.');
      }

      const { data: authData, error: authError } = await browserClient.auth.signUp({
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

      const stellaId = getStellaId(birth_date);

      // `users` 테이블에 추가 정보 저장
      const { error: dbError } = await browserClient.from('users').insert([
        {
          id: userId, // Auth의 user.id
          nickname, // 닉네임
          birth_date, // 생년월일
          stella_id: stellaId
        }
      ]);

      if (dbError) {
        throw new Error(dbError.message || '추가 정보를 저장하는 데 실패했습니다.');
      }

      return authData;
    }
  });
};
