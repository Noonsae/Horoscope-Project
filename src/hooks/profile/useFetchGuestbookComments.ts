import { useQuery } from '@tanstack/react-query';
import clientSupabase from '@/lib/supabase-client';
import { Comment, UseFetchGuestbookCommentsResult } from '@/types/guestbook-type';

// 훅 정의
const useFetchGuestbookComments = (userId: string | null): UseFetchGuestbookCommentsResult => {
  const fetchGuestbookComments = async (): Promise<Comment[]> => {
    if (!userId) return [];
    const { data, error } = await clientSupabase
      .from('guestbook')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw new Error('게스트북 데이터를 가져오는 중 오류가 발생했습니다.');
    return data || [];
  };

  const { data, isLoading, isError } = useQuery<Comment[], Error>({
    queryKey: ['guestbookComments', userId],
    queryFn: fetchGuestbookComments,
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    retry: 2
  });

  return {
    comments: data || [],
    commentsPending: isLoading,
    commentsError: isError
  };
};

export default useFetchGuestbookComments;
