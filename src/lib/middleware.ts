import { NextResponse, type NextRequest } from 'next/server';
import serverSupabase from '@/lib/supabase-server'; // 서버 전용 Supabase 클라이언트 임포트

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request
  });

  // 서버 전용 Supabase 클라이언트를 사용하여 인증 처리
  const {
    data: { user }
  } = await serverSupabase.auth.getUser();

  if (!user && !request.nextUrl.pathname.startsWith('/login')) {
    // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (user && request.nextUrl.pathname.startsWith('/login')) {
    // 이미 로그인한 사용자는 홈 페이지로 리다이렉트
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // 필요한 경우, 다른 서버 전용 Supabase API 호출
  // 예: 특정 데이터베이스 테이블에서 사용자 정보를 가져오기
  const { data: userProfile, error } = await serverSupabase.from('profiles').select('*').eq('id', user?.id).single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.redirect('/error');
  }

  console.log('User Profile:', userProfile);

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
