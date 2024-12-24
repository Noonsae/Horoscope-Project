'use client';

import { Comment } from '@/types/guestbook.type';
import { addComment } from '@/utils/guestbook';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';

const GuestbookForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  // 코멘트 추가
  const addMutation = useMutation<unknown, Error, Comment['comment']>({
    mutationFn: (newComment) => addComment(newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"]});
      inputRef.current!.value = '';
    }
  });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (inputRef.current && inputRef.current.value !== '') {
      const newComment = inputRef.current.value;
      addMutation.mutate(newComment);
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
      <button className="bg-white rounded px-2 py-1" type="submit">
        저장
      </button>
    </form>
  );
};

export default GuestbookForm;
