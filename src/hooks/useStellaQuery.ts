import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { stellas } from '@/types/stellas-type';

export const fetchStellaData = async (id: string): Promise<stellas> => {
  const { data, error } = await supabase.from('stellas').select('id, name, description, img_url').eq('id', id).single();

  if (error) {
    console.error('별자리 데이터 불러오기 실패!', error);
    throw error;
  }
  return data as stellas;
};

export const useStella = (id: string) => {
  return useQuery<stellas, Error>({
    queryKey: ['stella', id],
    queryFn: () => fetchStellaData(id)
  });
};
