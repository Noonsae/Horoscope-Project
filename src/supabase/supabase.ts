// supabase

// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseKey = process.env.NEXT_PUBLIC_VITE_SUPABASE_KEY!;
// const supabase = createClient(supabaseUrl, supabaseKey);

// export default supabase;

// ssr 사용할 경우 아래 로직 사용 예정입니다.

import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 환경 변수 값이 비어 있으면 명확한 오류 발생
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL 또는 anon key가 누락되었습니다. .env 파일을 확인하세요.');
}

export const createClient = () => createBrowserClient(supabaseUrl, supabaseAnonKey);

const browserClient = createClient();
export default browserClient;
