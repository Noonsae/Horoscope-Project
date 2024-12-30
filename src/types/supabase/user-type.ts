import { Tables } from './supabase-type';

export type User = Tables<'users'> & {
  stellas: {
    name: string;
    description: string;
  };
};
