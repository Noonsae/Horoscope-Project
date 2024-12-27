import { supabase } from '@/lib/supabase';
import { Comment } from '@/types/supabase/guestbook-type';

const user_id = '2be39632-2fbf-4815-96b0-71bc02a3cd5e';

// 코멘트 가져오기
export const fetchnewyearfortunesData = async () => {
  const { data, error } = await supabase
    .from('new_year_fortunes')
    .select('*, users(nickname, profile_img)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('코멘트 불러오기 실패!');
    throw error;
  }
  return data;
};

// 코멘트 저장
export const addComment = async (newComment: Comment['comment']) => {
  const { data, error } = await supabase
    .from('guestbook')
    .insert([{ comment: newComment, user_id: user_id }])
    .select();

  if (error) {
    console.error('코멘트 저장 실패!');
    throw error;
  }
  return data;
};
