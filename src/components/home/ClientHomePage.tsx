'use client';

import { useEffect, useState } from "react";
import UserHomePage from "./UserHomePage";
import GuestHomePage from "./GuestHomePage";
import clientSupabase from "@/lib/supabase-client";

const supabase = browserClient;

const ClientHomePage = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const ckeckLoginStatus = async () => {
      const { data } = await clientSupabase.auth.getSession();
      setIsLogin(!!data.session);
    };

    ckeckLoginStatus();

    const { data: listener } = clientSupabase.auth.onAuthStateChange((_envent, session) => {
      setIsLogin(!!session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return isLogin ? <UserHomePage /> : <GuestHomePage />;
};

export default ClientHomePage;
