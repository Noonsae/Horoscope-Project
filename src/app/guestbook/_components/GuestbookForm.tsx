'use client';

import useAuth from '@/hooks/guestbook/useGuestbookAuth';
import { useAddCommentMutation } from '@/hooks/guestbook/useGuestbookMutation';
import { useRef } from 'react';

const GuestbookForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isAuthenticated = useAuth();
  const addMutation = useAddCommentMutation();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (inputRef.current && inputRef.current.value !== '') {
      const newComment = inputRef.current.value;
      addMutation.mutate(newComment);
      inputRef.current!.value = '';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center mx-auto mt-8 w-[800px] p-6 rounded">
      <input
        className="mr-4 flex-grow rounded px-2 py-1"
        type="text"
        placeholder="새해 덕담을 나눠보세요."
        ref={inputRef}
      />
      <button
        className="rounded px-2 py-1 bg-blue-500 text-white hover:bg-blue-700"
        type="submit"
        disabled={!isAuthenticated}
      >
        저장
      </button>
    </form>
  );
};

export default GuestbookForm;
