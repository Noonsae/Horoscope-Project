import { createServerClient } from '@supabase/ssr';

export const supabaseServerClient = (cookies: Record<string, string | undefined> = {}) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('SUPABASE_URL 또는 SUPABASE_ANON_KEY 환경 변수가 누락되었습니다.');
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, { cookies });
};
