import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/lib/supabase';
import { DailyList, YearList } from '@/types/supabase';

const useFetchFortuneResults = () => {
  // Daily Results Fetcher
  const fetchDailyResults = async (): Promise<DailyList[]> => {
    const { data, error } = await supabase
      .from('daily_results') // 명시적 타입 지정
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch daily results:', error);
      throw new Error('Failed to fetch daily results');
    }

    return data || [];
  };

  // New Year Results Fetcher
  const fetchNewYearResults = async (): Promise<YearList[]> => {
    const { data, error } = await supabase
      .from('new_year_results') // 명시적 타입 지정
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch new year results:', error);
      throw new Error('Failed to fetch new year results');
    }

    return data || [];
  };

  // React Query - Daily Results
  const dailyResultsQuery = useQuery<DailyList[], Error>({
    queryKey: ['daily_results'],
    queryFn: fetchDailyResults,
    staleTime: 1000 * 60 * 5 // 5분
  });

  // React Query - New Year Results
  const newYearResultsQuery = useQuery<YearList[], Error>({
    queryKey: ['new_year_results'],
    queryFn: fetchNewYearResults,
    staleTime: 1000 * 60 * 5 // 5분
  });

  // 반환 데이터
  return {
    dailyResults: dailyResultsQuery.data || [],
    newYearResults: newYearResultsQuery.data || [],
    isLoading: dailyResultsQuery.isLoading || newYearResultsQuery.isLoading,
    isError: dailyResultsQuery.isError || newYearResultsQuery.isError
  };
};

export default useFetchFortuneResults;
