import { Database } from '@/types/supabase/supabase-type';

export type DatabaseUser = Database['public']['Tables']['users']['Row'];

export interface AuthUser {
  id: string;
  email?: string;
}

export type User = DatabaseUser & AuthUser;

export interface SignInPayload {
  email: string;
  password: string;
}
