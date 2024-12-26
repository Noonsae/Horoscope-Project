// src/lib/supabase-server.ts

import { createClient } from '@supabase/supabase-js';

// Supabase URL 및 서비스 역할 키 환경 변수 가져오기
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// 환경 변수 유효성 검사
if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('Supabase 서버 환경 변수가 설정되지 않았습니다.');
}

// 서버 전용 Supabase 클라이언트 생성
const serverSupabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export default serverSupabase;
