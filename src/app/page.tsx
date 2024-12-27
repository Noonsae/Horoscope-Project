import ClientHomePage from '@/components/home/ClientHomePage';
import { supabase } from '@/lib/supabase';
import { Tables } from '@/types/supabase-type';

export const revalidate = 86400; // ISR: 하루마다 갱신

type DailyFortune = Tables<'daily_fortunes'>;

const HomePage = async () => {
  // 모든 daily_fortunes 데이터 가져오기 (stella_id와 매칭하기 위해)
  const { data: dailyFortunes, error } = await supabase.from('daily_fortunes').select('*');

  if (error) {
    return <p>운세를 불러오는 중 오류가 발생했습니다.</p>;
  }

  return (
    <div>
      <ClientHomePage dailyFortunes={(dailyFortunes || []) as DailyFortune[]} />
    </div>
  );
};

export default HomePage;
