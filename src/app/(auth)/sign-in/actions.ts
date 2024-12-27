import { supabase } from '@/lib/supabase';

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error || !data.user) {
      throw new Error('로그인에 실패했습니다. 이메일 또는 비밀번호를 확인하세요.');
    }

    return { user: data.user };
  } catch (error) {
    console.error('로그인 중 에러 발생:', error);
    throw new Error('서버에서 문제가 발생했습니다. 다시 시도해 주세요.');
  }
}
