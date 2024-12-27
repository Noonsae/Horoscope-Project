'use client';

import { supabase } from '@/lib/supabase';
import { Comment } from '@/types/guestbook-type';
import { addComment } from '@/utils/guestbook';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

const GuestbookForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // 로그인 상태가 아닐 시, 저장 버튼 disabled 처리
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setIsAuthenticated(!!data.user);
    };
    fetchUser();
  }, []);

  // 코멘트 추가
  const addMutation = useMutation<unknown, Error, Comment['comment']>({
    mutationFn: (newComment) => addComment(newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      if (inputRef.current) {
        inputRef.current.value = '';
      }
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
