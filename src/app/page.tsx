'use client';

import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import UserHomePage from './my-page/components/home/UserHomePage';
import GuestHomePage from './my-page/components/home/GuestHomepage';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const HomePage = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const ckeckLoginStatus = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLogin(!!data.session);
    };

    ckeckLoginStatus();

    const { data: listener } = supabase.auth.onAuthStateChange((_envent, session) => {
      setIsLogin(!!session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return isLogin ? <UserHomePage /> : <GuestHomePage />;
};

export default HomePage;
