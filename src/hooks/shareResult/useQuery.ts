'use client';

import { useQuery } from '@tanstack/react-query';
import { DailyList as DailyListType, YearList as YearListType } from '@/types/supabase-type';
import { fetchDailyResults, fetchNewYearResults } from '@/utils/shareResult';
import useAuthStore from '@/store/useAuth';

export const useDailyCardList = () => {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id;

  console.log('useDailyResults -> userId:', userId); // 로그 추가

  return useQuery<DailyListType[], Error>({
    queryKey: ['dailyResults', userId],
    queryFn: () => fetchDailyResults(userId || ''),
    enabled: !!userId
  });
};

export const useYearCardList = () => {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id;

  console.log('useYearResults -> userId:', userId); // 로그 추가

  return useQuery<YearListType[], Error>({
    queryKey: ['yearResults', userId],
    queryFn: () => fetchNewYearResults(userId || ''),
    enabled: !!userId
  });
};
