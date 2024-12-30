import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export const fetchNewDailyFortune = async (stellaId: string): Promise<string | null> => {
  const { data, error } = await supabase.from('daily_fortunes').select('content').eq('stella_id', stellaId).single();

  if (error) {
    console.error('일일일 운세 데이터 불러오기 실패!', error);
    throw error;
  }

  return data?.content || null; 
};

export const useNewDailyFortune = (stellaId: string) => {
  return useQuery<string | null, Error>({
    queryKey: ['daily_fortunes', stellaId],
    queryFn: () => fetchNewDailyFortune(stellaId),
    enabled: !!stellaId 
  });
};
