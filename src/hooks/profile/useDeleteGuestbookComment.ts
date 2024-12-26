import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuthStore from '@/store/useAuthStore';

type CommentId = string;

export const useDeleteComment = () => {
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  // Supabase API 요청을 API 라우트로 대체
  const deleteComment = useCallback(async (commentId: CommentId): Promise<void> => {
    const response = await fetch('/api/delete-comment', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commentId })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete comment.');
    }
  }, []);

  const handleCommentDelete = useMutation<void, Error, CommentId>({
    mutationFn: deleteComment,
    onSuccess: () => {
      if (user?.id) {
        queryClient.invalidateQueries({
          queryKey: ['users', user.id] // 쿼리 키 명확히 설정
        });
      }
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: '삭제 실패',
        text: error.message || '다시 시도해주세요.',
        confirmButtonColor: '#d33'
      });
    }
  });

  const confirmDeleteComment = useCallback(
    (commentId: CommentId) => {
      Swal.fire({
        icon: 'warning',
        title: '정말 삭제하시겠습니까?',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: '삭제',
        cancelButtonText: '취소'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: '삭제 중...',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            }
          });

          handleCommentDelete.mutate(commentId, {
            onSuccess: () => {
              Swal.fire({
                icon: 'success',
                title: '삭제 완료!',
                confirmButtonColor: '#429f50'
              });
            }
          });
        }
      });
    },
    [handleCommentDelete]
  );

  return { user, confirmDeleteComment };
};
