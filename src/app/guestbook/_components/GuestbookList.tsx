'use client';

import { Comment } from '@/types/supabase/guestbook-type';
import { useEffect, useState } from 'react';
import { updateComment, deleteComment, fetchCommentData, getId } from '@/utils/guestbook'; // Supabase 함수 가져오기
import Image from 'next/image';

import changeTime from '@/utils/changeTime';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type MutationVariable = { editingComment: Comment['comment']; editingId: Comment['id'] };
type ContextVariable = { previousComments: Comment[] | undefined };

const GuestbookList = () => {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedComment, setEditedComment] = useState<string>('');
  const [currentId, setCurrentId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchUserId = async () => {
      const userId = await getId();
      setCurrentId(userId);
    };
    fetchUserId();
  }, []);

  // 코멘트 데이터 불러오기
  const {
    data: comments,
    isError,
    isLoading
  } = useQuery<Comment[], Error>({
    queryKey: ['comments'],
    queryFn: () => fetchCommentData()
  });

  // 코멘트 업데이트
  const updateMutation = useMutation<unknown, Error, MutationVariable, ContextVariable>({
    mutationFn: ({ editingComment, editingId }) => updateComment({ editingComment, editingId }),
    onMutate: async ({ editingComment, editingId }) => {
      await queryClient.cancelQueries({ queryKey: ['comments'] });

      const previousComments = queryClient.getQueryData<Comment[]>(['comments']);
      queryClient.setQueryData<Comment[]>(['comments'], (prev) =>
        prev?.map((comment) => (comment.id === editingId ? { ...comment, comment: editingComment } : comment))
      );
      return { previousComments };
    },
    onError: (err, _, context) => {
      console.error('Error updating comment:', err);
      queryClient.setQueryData(['comments'], context?.previousComments);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    }
  });

  const handleSave = (id: string) => {
    if (!editedComment.trim()) {
      return alert('덕담을 입력해주세요.');
    }
    updateMutation.mutate({ editingComment: editedComment, editingId: id });
    setEditingCommentId(null);
  };

  // 코멘트 삭제
  const deleteMutation = useMutation<unknown, Error, Comment['id']>({
    mutationFn: deleteComment,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['comments'] })
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <div>로딩중..</div>;
  if (isError) return <div>에러 발생!</div>;

  return (
    <div className="flex flex-col justify-center items-center mx-auto my-8 w-[800px] bg-gradient-to-b from-black to-purple-900 p-6 shadow-lg rounded gap-6">
      {comments?.map((comment) => (
        <div
          key={comment.id}
          className="flex flex-col justify-center items-center mx-auto w-[750px] bg-white p-6 shadow-lg rounded"
        >
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <Image
                className="w-10 h-10 bg-gray-500 rounded-full"
                src={comment.users?.profile_img || '/images/default_profile_img.webp'}
                alt="프로필 이미지"
                width={100}
                height={100}
              />
              <p className="font-medium">{comment.users?.nickname}</p>
              <p className="text-xs text-gray-500">{changeTime(comment.created_at)}</p>
            </div>
            <div className="flex space-x-2">
              {/* 현재 아이디가 로그인된 아이디와 같고, 해당 댓글을 수정하고 있는 경우에만 수정/저장 버튼 표시 */}
              {currentId && currentId === comment.user_id && editingCommentId === comment.id ? (
                <>
                  <button
                    className="border border-gray-300 rounded px-2 py-1"
                    type="button"
                    onClick={() => handleSave(comment.id)}
                  >
                    저장
                  </button>
                  <button
                    className="border border-gray-300 rounded px-2 py-1"
                    type="button"
                    onClick={() => setEditingCommentId(null)}
                  >
                    취소
                  </button>
                </>
              ) : (
                currentId &&
                currentId === comment.user_id && (
                  <button
                    className="border border-gray-300 rounded px-2 py-1"
                    type="button"
                    onClick={() => {
                      setEditingCommentId(comment.id);
                      setEditedComment(comment.comment);
                    }}
                  >
                    수정
                  </button>
                )
              )}
              {/* 삭제 버튼은 로그인된 아이디가 해당 댓글의 작성자일 때만 표시 */}
              {currentId && currentId === comment.user_id && (
                <button
                  className="border border-gray-300 rounded px-2 py-1"
                  type="button"
                  onClick={() => handleDelete(comment.id)}
                >
                  &times;
                </button>
              )}
            </div>
          </div>
          {editingCommentId === comment.id ? (
            <textarea
              value={editedComment}
              onChange={(e) => setEditedComment(e.target.value)}
              className="leading-[1.8rem] mt-4 flex-grow px-2 py-1 border rounded w-full max-w-full h-10 resize-none"
            />
          ) : (
            <p className="mr-auto mt-4 flex-grow px-2 py-1">{comment.comment}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default GuestbookList;
