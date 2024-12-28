"use client"

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment, updateComment, deleteComment } from '@/utils/guestbook';
import { Comment } from '@/types/guestbook-type';

// 코멘트 추가
export const useAddCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, Comment['comment']>({
    mutationFn: (newComment) => addComment(newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    }
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
    },
  });
};
