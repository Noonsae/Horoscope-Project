'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchDailyResults, fetchNewYearResults } from '@/utils/shareResult';
import { DailyList as DailyListType, YearList as YearListType} from '@/types/supabase';

export const useDailyResults = () => {
  return useQuery<DailyListType[], Error, DailyListType[], [string]>({
    queryKey: ['dailyResults'],
    queryFn: () => fetchDailyResults()
  });
};

export const useYearResults = () => {
  return useQuery<YearListType[], Error, YearListType[], [string]>({
    queryKey: ['yearResults'],
    queryFn: () => fetchNewYearResults()
  });
};
