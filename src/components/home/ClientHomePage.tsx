'use client';

import { useEffect, useState } from 'react';
import UserHomePage from './UserHomePage';
import GuestHomePage from './GuestHomePage';

import { supabase } from '@/lib/supabase';
import { Tables } from '@/types/supabase-type';

type DailyFortune = Tables<'daily_fortunes'>;

type Props = {
  dailyFortunes: DailyFortune[];
};

const ClientHomePage = ({ dailyFortunes }: Props) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userMonthDay, setUserMonthDay] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;

      setIsLogin(!!session);

      if (session) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('birth_date')
          .eq('id', session.user.id)
          .single();

        if (userData?.birth_date) {
          const monthDay = userData.birth_date.slice(5, 10); // "MM-DD" 형식
          setUserMonthDay(monthDay);
        }
      }
    };

    fetchUserData();

    const { data: listener } = supabase.auth.onAuthStateChange((_envent, session) => {
      setIsLogin(!!session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return isLogin ? <UserHomePage dailyFortunes={dailyFortunes} userMonthDay={userMonthDay} /> : <GuestHomePage />;
};

export default ClientHomePage;
