import { createServerClient } from '@supabase/ssr';

export const supabaseServerClient = (cookies: Record<string, string | undefined> = {}) => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('환경 변수 SUPABASE_URL 또는 SUPABASE_ANON_KEY가 누락되었습니다.');
  }

  // 기본값 설정 (필요한 경우)
  cookies = cookies || {};

  return createServerClient(supabaseUrl, supabaseAnonKey, { cookies });
};
