import { Tables } from './supabase-type';

export type Comment = Tables<'guestbook'> & {
  users: {
    nickname: string;
    profile_img: string | null;
  };
};

