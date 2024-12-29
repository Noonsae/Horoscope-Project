'use client';

import { useEffect, useState } from 'react';
import { getId } from '@/utils/guestbook';
import Image from 'next/image';
import changeTime from '@/utils/changeTime';
import Loading from '@/app/loading';
import useGuestbookData from '@/hooks/guestbook/useGuestbookQuery';
import { useDeleteComment, useUpdateComment } from '@/hooks/guestbook/useGuestbookMutation';
import Swal from 'sweetalert2';

const GuestbookList = () => {
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedComment, setEditedComment] = useState<string>('');
  const [currentId, setCurrentId] = useState<string | null>(null);

  const { data: comments, isError, isPending } = useGuestbookData();
  const updateMutation = useUpdateComment();
  const deleteMutation = useDeleteComment();

  useEffect(() => {
    const fetchUserId = async () => {
      const userId = await getId();
      setCurrentId(userId);
    };
    fetchUserId();
  }, []);

  const handleSave = (id: string) => {
    if (!editedComment.trim()) {
      Swal.fire({
        title: '오류',
        text: '덕담을 입력해주세요.',
        icon: 'error',
        confirmButtonText: '확인'
      });
      return;
    }
    updateMutation.mutate({ editingComment: editedComment, editingId: id });
    setEditingCommentId(null);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (isPending) return <Loading />;
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
