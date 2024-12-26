import { Tables } from './supabase';

export type Comment = Tables<'guestbook'> & {
  users: {
    nickname: string;
    profile_img: string | null;
  };
};

export interface GuestbookComment {
  id: string;
  created_at: string;
  comment: string;
  user_id: string;
};

export interface UseFetchGuestbookCommentsResult {
  comments: Comment[];
  commentsPending: boolean;
  commentsError: boolean;
};