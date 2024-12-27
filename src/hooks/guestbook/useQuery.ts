"use client"

import { useQuery } from '@tanstack/react-query';
import { fetchCommentData } from '@/utils/guestbook';
import { Comment } from '@/types/guestbook-type';

const useGuestbookData = () => {
  return useQuery<Comment[], Error>({
    queryKey: ['comments'],
    queryFn: () => fetchCommentData(),
  });
};

export default useGuestbookData;
