import { serverSupabase } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';
import { getStellaId } from '@/utils/stellaCalculator'; // 별자리 계산 함수 참조

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('API Received Payload:', body);

    const { email, password, nickname, birth_date } = body;

    const supabase = await serverSupabase();

    // Supabase 회원가입 요청
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname,
          birth_date
        }
      }
    });

    console.log('Supabase auth.signUp response:', { data, error });

    if (!data?.user) {
      console.error('이미 가입된 이메일입니다');
      return NextResponse.json({ errorMsg: '이미 가입된 이메일입니다' }, { status: 400 });
    }

    if (error) {
      console.error('회원가입 실패:', error);
      return NextResponse.json({ errorMsg: '회원가입에 실패했습니다' }, { status: 400 });
    }

    // 별자리 ID 계산
    let stellaId;
    try {
      stellaId = getStellaId(new Date(birth_date)); // 생년월일로 별자리 ID 계산
    } catch (error) {
      console.error('별자리 계산 실패:', error);
      return NextResponse.json({ errorMsg: '별자리를 계산하는 데 실패했습니다.' }, { status: 400 });
    }

    // 사용자 정보를 users 테이블에 저장
    const { error: dbError } = await supabase.from('users').insert({
      id: data.user.id, // auth.users의 ID
      nickname,
      birth_date,
      stella_id: stellaId // 계산된 별자리 ID 사용
    });

    console.log('Supabase users.insert response:', { dbError });

    if (dbError) {
      console.error('사용자 데이터 저장 실패:', dbError);
      return NextResponse.json({ errorMsg: '사용자 데이터를 저장하는 데 실패했습니다' }, { status: 500 });
    }

    return NextResponse.json({ message: '회원가입이 완료되었습니다', user: data?.user }, { status: 200 });
  } catch (error) {
    console.error('서버 오류:', error);
    return NextResponse.json({ errorMsg: '서버에서 문제가 발생했습니다' }, { status: 500 });
  }
}
