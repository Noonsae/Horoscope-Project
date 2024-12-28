'use client';

import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { getStellaId } from '@/utils/stellaCalculator';

interface SignUpPayload {
  email: string;
  password: string;
  checkPassword: string;
  nickname: string;
  birth_date: string;
}

const useSignUpMutation = () => {
  return useMutation({
    mutationFn: async ({ email, password, checkPassword, nickname, birth_date: birth_date }: SignUpPayload) => {

      // 유효성 검사
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('유효하지 않은 이메일 형식입니다.');
      }
      if (password.length < 8) {
        throw new Error('비밀번호는 최소 8자 이상으로 입력해주세요.');
      }
      if (!nickname || nickname.trim().length === 0) {
        throw new Error('닉네임을 입력해주세요.');
      }
      if (nickname.length > 10) {
        throw new Error('닉네임은 10자 이하로 입력해주세요.');
      }
      if (password !== checkPassword) {
        throw new Error('입력하신 비밀번호와 같지 않습니다. 다시 확인해주세요.');
      }
      const parsedDate = new Date(birth_date);
      if (!(parsedDate instanceof Date) || isNaN(parsedDate.getTime())) {
        throw new Error('유효한 생년월일을 입력해주세요.');
      }

      // Supabase Auth 사용자 등록
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

      // Stella ID 생성
      const stellaId = getStellaId(parsedDate);
      if (!stellaId) {
        throw new Error('별자리 ID를 생성할 수 없습니다.');
      }

      // `users` 테이블에 추가 정보 저장
      const formattedBirthDate = new Date(birth_date).toISOString().split('T')[0];
      const { error: dbError } = await supabase.from('users').insert([
        {
          id: userId, // Auth의 user.id
          nickname: nickname.trim(), // 닉네임
          birth_date: parsedDate.toISOString(), // ISO 형식으로 저장
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

export default useSignUpMutation;
