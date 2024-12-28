import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export const fetchNewYearFortune = async (stellaId: string): Promise<string | null> => {
  const { data, error } = await supabase.from('new_year_fortunes').select('content').eq('stella_id', stellaId).single();

  if (error) {
    console.error('신년 운세 데이터 불러오기 실패!', error);
    throw error;
  }

  return data?.content || null; // Return content or null if not found
};

export const useNewYearFortune = (stellaId: string) => {
  return useQuery<string | null, Error>({
    queryKey: ['new_year_fortune', stellaId],
    queryFn: () => fetchNewYearFortune(stellaId),
    enabled: !!stellaId // Only run query if stellaId is available
  });
};


