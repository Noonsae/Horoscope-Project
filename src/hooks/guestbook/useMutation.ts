"use client"

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment, updateComment, deleteComment } from '@/utils/guestbook';
import { Comment } from '@/types/guestbook-type';
import Swal from 'sweetalert2';

// 코멘트 추가
export const useAddCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, Comment['comment']>({
    mutationFn: (newComment) => addComment(newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      Swal.fire({
        title: '성공',
        text: '코멘트가 성공적으로 추가되었습니다!',
        icon: 'success',
        confirmButtonText: '확인',
      });
    },
    onError: () => {
      Swal.fire({
        title: '오류',
        text: '코멘트를 추가하는 도중 문제가 발생했습니다.',
        icon: 'error',
        confirmButtonText: '확인',
      });
    },
  });
};

// 코멘트 수정
type MutationVariable = { editingComment: Comment['comment']; editingId: Comment['id'] };
type ContextVariable = { previousComments: Comment[] | undefined };

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, MutationVariable, ContextVariable>({
    mutationFn: ({ editingComment, editingId }) =>
      updateComment({ editingComment, editingId }),
    onMutate: async ({ editingComment, editingId }) => {
      await queryClient.cancelQueries({ queryKey: ['comments'] });

      const previousComments = queryClient.getQueryData<Comment[]>(['comments']);
      queryClient.setQueryData<Comment[]>(['comments'], (prev) =>
        prev?.map((comment) =>
          comment.id === editingId ? { ...comment, comment: editingComment } : comment
        )
      );
      return { previousComments };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['comments'], context?.previousComments);
      Swal.fire({
        title: '오류',
        text: '코멘트를 수정하는 도중 문제가 발생했습니다.',
        icon: 'error',
        confirmButtonText: '확인',
      });
    },
    onSuccess: () => {
      Swal.fire({
        title: '성공',
        text: '코멘트가 성공적으로 수정되었습니다!',
        icon: 'success',
        confirmButtonText: '확인',
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};

// 코멘트 삭제
export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, Comment['id']>({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      Swal.fire({
        title: '삭제 완료',
        text: '코멘트가 성공적으로 삭제되었습니다!',
        icon: 'success',
        confirmButtonText: '확인',
      });
    },
    onError: () => {
      Swal.fire({
        title: '오류',
        text: '코멘트를 삭제하는 도중 문제가 발생했습니다.',
        icon: 'error',
        confirmButtonText: '확인',
      });
    },
  });
};
