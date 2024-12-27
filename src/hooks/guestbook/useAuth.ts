"use client"

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setIsAuthenticated(!!data.user);
    };
    fetchUser();
  }, []);

  return isAuthenticated;
};

export default useAuth;
