import { Tables } from './supabase';

export type Comment = Tables<'guestbook'> & {
  users: {
    nickname: string;
    profile_img: string | null;
  };
};
