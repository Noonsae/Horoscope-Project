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
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            supabaseResponse.cookies.set(name, value, options);
          });
        }
      }
    }
  );

  const {
    data: { user }
  } = await supabase.auth.getUser();

  const url = request.nextUrl.clone();

  // 로그인 상태인 경우
  if (user) {
    // 로그인 상태에서 접근 불가한 경로
    if (
      request.nextUrl.pathname.startsWith('/sign-in') ||
      request.nextUrl.pathname.startsWith('/sign-up')
    ) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  } else {
    // 비로그인 상태에서 접근 불가한 경로 및 '/' 경로 차단
    if (
      request.nextUrl.pathname.startsWith('/my-page') ||
      request.nextUrl.pathname.startsWith('/user-home')      
    ) {
      url.pathname = '/sign-in';
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}
