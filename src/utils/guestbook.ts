import supabase from '@/supabase/supabase';
import { Comment } from '@/types/guestbook.type';

// user Id 가져오기
// export const getId = async () => {
//   const {
//     data: {
//       session: {
//         user: { id }
//       }
//     },
//     error
//   } = await supabase.auth.getSession();
//   if (error || !id) {
//     return alert('로그인 상태가 아닙니다.');
//   }
//   return id;
// };

const user_id = '2be39632-2fbf-4815-96b0-71bc02a3cd5e';

// 코멘트 가져오기
export const fetchCommentData = async () => {
  const { data, error } = await supabase
    .from('guestbook')
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

// 코멘트 업데이트
type updateCommentProps = {
  editingComment: Comment['comment'];
  editingId: Comment['id'];
};

export const updateComment = async ({ editingComment, editingId }: updateCommentProps) => {
  const { data, error } = await supabase
    .from('guestbook')
    .update({ comment: editingComment })
    .eq('id', editingId)
    .select();

  if (error) {
    console.error('코멘트 업데이트 실패!', error);
    throw error;
  }
  return data;
};

// 코멘트 삭제
export const deleteComment = async (id: Comment['id']) => {
  const { data, error } = await supabase.from('guestbook').delete().eq('id', id);

  if (error) {
    console.error('코멘트 삭제 실패!', error);
    throw error;
  }
  return data;
};
