import { Tables } from './supabase-type';

export type Comment = Tables<'stellas'> & {
  users: {
    id: string;
    name: String;
    description: String;
  };
};
