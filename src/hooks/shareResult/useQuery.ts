'use client';

import { useQuery } from '@tanstack/react-query';

import { fetchDailyResults, fetchNewYearResults } from '@/utils/shareResult';
import useAuthStore from '@/store/useAuth';
import { DailyListType, YearListType } from '@/types/supabase';

export const useDailyCardList = () => {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id;

  return useQuery<DailyListType[], Error>({
    queryKey: ['dailyResults', userId],
    queryFn: () => fetchDailyResults(userId || ''),
    enabled: !!userId
  });
};

export const useYearCardList = () => {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id;

  return useQuery<YearListType[], Error>({
    queryKey: ['yearResults', userId],
    queryFn: () => fetchNewYearResults(userId || ''),
    enabled: !!userId
  });
};
