'use client';

import useAuth from '@/hooks/guestbook/useAuth';
import { useAddCommentMutation } from '@/hooks/guestbook/useMutation';
import { useRef } from 'react';
import Swal from 'sweetalert2';

const GuestbookForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isAuthenticated = useAuth();
  const addMutation = useAddCommentMutation();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (inputRef.current && inputRef.current.value !== '') {
      const newComment = inputRef.current.value;
      addMutation.mutate(newComment, {
        onSuccess: () => {
          if (inputRef.current) {
            inputRef.current.value = '';
          }
          Swal.fire({
            title: '성공!',
            text: '코멘트가 성공적으로 저장되었습니다!',
            icon: 'success',
            confirmButtonText: '확인',
          });
        },
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center mx-auto mt-8 w-[800px] bg-black p-6 shadow-lg rounded"
    >
      <input
        className="mr-4 flex-grow rounded px-2 py-1"
        type="text"
        placeholder="새해 덕담을 나눠보세요."
        ref={inputRef}
      />
      <button
        className={`rounded px-2 py-1 ${
          isAuthenticated
            ? 'bg-white text-black'
            : 'bg-gray-600 text-gray-200 cursor-not-allowed'
        }`}
        type="submit"
        disabled={!isAuthenticated}
      >
        저장
      </button>
    </form>
  );
};

export default GuestbookForm;
