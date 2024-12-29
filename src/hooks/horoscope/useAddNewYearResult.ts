// hooks/useAddNewYearResult.ts

import { supabase } from '@/lib/supabase';
import { useMutation } from '@tanstack/react-query';

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
    mutationFn: (id) => addNewYearResult(id!)
  });
};
