import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  // 초기 응답 객체 생성
  const response = NextResponse.next();

  // Supabase 클라이언트 생성
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        }
      }
    }
  );

  // 로그인 상태 확인
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  const url = request.nextUrl.clone();

  if (error) {
    console.error('Error fetching user:', error.message);
  }

  // 로그인 상태 처리
  if (user) {
    // 로그인된 사용자는 /sign-in 또는 /sign-up 접근 불가
    if (request.nextUrl.pathname.startsWith('/sign-in') || request.nextUrl.pathname.startsWith('/sign-up')) {
      url.pathname = '/'; // 리디렉션 경로 설정
      return NextResponse.redirect(url);
    }
  } else {
    // 비로그인 사용자는 /my-page, /user-home 접근 불가
    if (request.nextUrl.pathname.startsWith('/my-page') || request.nextUrl.pathname.startsWith('/user-home')) {
      url.pathname = '/sign-in'; // 리디렉션 경로 설정
      return NextResponse.redirect(url);
    }
  }

  return response;
}

// 미들웨어로 사용
export const config = {
  matcher: ['/my-page', '/user-home', '/sign-in', '/sign-up'] // 처리할 경로 설정
};
