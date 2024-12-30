// hooks/useAddNewYearResult.ts

import { supabase } from '@/lib/supabase';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';

export const getId = async (): Promise<string | null> => {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    console.error('유저 아이디 불러오기 실패!', error);
    return null;
  }
  return data.user.id;
};

const getNewYearFortuneId = async (id: string) => {
  const { data, error } = await supabase.from('new_year_fortunes').select('id').eq('stella_id', id).single();

  if (error) {
    console.error('코멘트 불러오기 실패!');
    return null;
  }
  return data?.id || null;
};

export const addNewYearResult = async (id: string): Promise<any> => {
  const newYearFortuneId: string | null = await getNewYearFortuneId(id);
  const user_id: string | null = await getId();

  if (!user_id) {
    throw new Error('사용자 ID를 가져오는 데 실패했습니다.');
  }

  const { data, error } = await supabase
    .from('new_year_results')
    .insert([{ user_id: user_id, new_year_fortune_id: newYearFortuneId }])
    .select();

  if (error) {
    console.error('신년 운세 결과 추가 실패!', error);
    throw error;
  }

  return data;
};

export const useAddNewYearResultMutation = (id: string) => {
  return useMutation<string, Error>({
    mutationFn: (id) => addNewYearResult(id!),
    onSuccess: () => {
      Swal.fire({
        title: '성공',
        text: '신년운세가 성공적으로 추가되었습니다!',
        icon: 'success',
        confirmButtonText: '확인'
      });
    },
    onError: () => {
      Swal.fire({
        title: '오류',
        text: '신년운세를 추가하는 도중 문제가 발생했습니다.',
        icon: 'error',
        confirmButtonText: '확인'
      });
    }
  });
};
