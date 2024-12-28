"use server"

import { serverSupabase } from '@/lib/supabase-server';

import { NextResponse } from 'next/server';

export async function POST(request: Request) {

  const supabase = serverSupabase();

  const { email, password } = await request.json();
  console.log('요청 데이터:', { email, password });
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      console.error('Supabase 인증 오류:', error.message);
      return NextResponse.json({ errorMsg: error.message }, { status: 401 });
    }

    console.log('인증 성공 데이터:', data);

    return NextResponse.json({ message: '로그인에 성공했습니다', user: data?.user }, { status: 200 });
  } catch (error) {
    console.error('서버 에러:', error);
    return NextResponse.json({ errorMsg: '서버에서 문제가 발생했습니다. 다시 시도해 주세요.' }, { status: 500 });
  }
}