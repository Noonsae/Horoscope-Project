'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchCommentData } from '@/utils/guestbook';
import { Comment } from '@/types/supabase';

const useGuestbookData = () => {
  return useQuery<Comment[], Error>({
    queryKey: ['comments'],
    queryFn: () => fetchCommentData()
  });
};

export default useGuestbookData;
