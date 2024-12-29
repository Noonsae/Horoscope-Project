// utils/shareResult.ts
import { supabase } from '@/lib/supabase';
import useAuthStore from '@/store/useAuth';

export const fetchDailyResults = async () => {
  // zustand에서 userId 가져오기
  const userId = useAuthStore.getState().user?.id;
  if (!userId) {
    console.error('fetchDailyResults -> User ID is missing');
    throw new Error('User not logged in');
  }

  const { data, error } = await supabase
    .from('daily_results')
    .select('id, created_at, user_id, daily_fortunes(content), users(nickname, profile_img)')
    .eq('user_id', userId) // 로그인된 사용자 ID로 필터링
    .order('created_at', { ascending: false });

  if (error) {
    console.error('fetchDailyResults Error:', error);
    throw error;
  }
  return data;
};

export const fetchNewYearResults = async () => {
  // zustand에서 userId 가져오기
  const userId = useAuthStore.getState().user?.id;
  if (!userId) {
    console.error('fetchNewYearResults -> User ID is missing');
    throw new Error('User not logged in');
  }

  const { data, error } = await supabase
    .from('new_year_results')
    .select('id, created_at, user_id, new_year_fortunes(content), users(nickname, profile_img)')
    .eq('user_id', userId) // 로그인된 사용자 ID로 필터링
    .order('created_at', { ascending: false });

  if (error) {
    console.error('fetchNewYearResults Error:', error);
    throw error;
  }
  return data;
};
