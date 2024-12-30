'use client';

import { useEffect, useState } from 'react';
import ClientHomePage from '@/components/home/ClientHomePage';
import { supabase } from '@/lib/supabase';
import { Tables } from '@/types/supabase/supabase-type';

type DailyFortune = Tables<'daily_fortunes'>;

const HomePage = () => {
  const [dailyFortunes, setDailyFortunes] = useState<DailyFortune[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDailyFortunes = async () => {
      try {
        const { data, error } = await supabase.from('daily_fortunes').select('*');
        if (error) {
          console.error('Error fetching daily fortunes:', error);
          setError('운세를 불러오는 중 오류가 발생했습니다.');
        } else {
          setDailyFortunes(data as DailyFortune[]);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('예상치 못한 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDailyFortunes();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient">
        <p className="text-[50px] text-[#FFDA68] text-center -mt-[20px]">잠시만 기다려주세요...</p>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <ClientHomePage dailyFortunes={dailyFortunes || []} />
    </div>
  );
};

export default HomePage;
