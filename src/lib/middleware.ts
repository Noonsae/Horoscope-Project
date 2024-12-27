// utils/supabase/middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request
          });
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
        }
      }
    }
  );

  const {
    data: { session },
    error
  } = await supabase.auth.getSession();
  console.log('세션 데이터:', session);
  if (error) {
    console.error('세션 가져오기 실패:', error.message);
  }

  const user = session?.user; // 세션에서 사용자 정보 가져오기

  // 로그인 필요 페이지에 접근 시 비로그인 상태라면 /login으로 리다이렉트
  if (!user && !request.nextUrl.pathname.startsWith('/login')) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // 로그인 상태인데 로그인 페이지로 가려는 경우 메인 페이지로 리다이렉트
  if (user && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(request.nextUrl.origin);
  }

  return NextResponse.next();
}
