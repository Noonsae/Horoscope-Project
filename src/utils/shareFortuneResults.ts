// utils/shareResult.ts
import { supabase } from '@/lib/supabase';

export const fetchDailyResults = async () => {
  const { data, error } = await supabase
    .from('daily_results')
    .select('*, users(nickname, profile_img), daily_fortunes(content)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('코멘트 불러오기 실패!');
    throw error;
  }
  return data;
};

export const fetchNewYearResults = async () => {
  const { data, error } = await supabase
    .from('new_year_results')
    .select('*, new_year_fortunes(content), users(nickname, profile_img)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('코멘트 불러오기 실패!');
    throw error;
  }
  return data;
}