'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const useAuth = () => {
  const [user, setUser] = useState<any>(null); // 사용자 정보 상태
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // 인증 여부 상태

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();

      setUser(data.user); // 사용자 정보 저장
      setIsAuthenticated(!!data.user); // 인증 여부 저장
    };

    fetchUser();
  }, []);

  return { user, isAuthenticated }; // 사용자 정보와 인증 여부 반환
};

export default useAuth;
