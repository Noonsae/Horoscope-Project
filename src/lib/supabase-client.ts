// src/lib/supabase-client.ts

import { createClient } from '@supabase/supabase-js';

// Supabase URL 및 익명 키 환경 변수 가져오기
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 환경 변수 유효성 검사
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase 클라이언트 환경 변수가 설정되지 않았습니다.');
}

// 클라이언트 전용 Supabase 클라이언트 생성
const clientSupabase = createClient(supabaseUrl, supabaseAnonKey);

export default clientSupabase;
