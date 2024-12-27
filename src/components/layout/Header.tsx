'use client';

// import useAuthStore from '@/utils/useAuthStore';
import { supabase } from '@/lib/supabase';
import { isLogin } from '@/utils/isLogin';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const result = await isLogin(); // isLogin 호출
      setLoggedIn(result);
    };

    checkLogin();
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('로그아웃 실패:', error.message);
        return;
      }

      setLoggedIn(false);
      window.location.href = '/';
    } catch (err) {
      console.error('로그아웃 중 오류 발생:', err);
    }
  };

  // const { isAuthenticated, logout } = useAuthStore();
  return (
    <nav className="w-full bg-gray-800 text-white">
      <div className="flex justify-between items-center px-8 py-3">
        <div className="flex items-center">
          <div className="text-lg font-bold mr-10">
            <Link href="/">Stella</Link>
          </div>
          <div className="space-x-6">
            <Link href="/constellation" className="hover:text-yellow-400">
              소개
            </Link>
            <Link href="/horoscope" className="hover:text-yellow-400">
              운세
            </Link>
            <Link href="/chemi" className="hover:text-yellow-400">
              궁합
            </Link>
            <Link href="/share-result" className="hover:text-yellow-400">
              공유
            </Link>
            <Link href="/guestbook" className="hover:text-yellow-400">
              덕담
            </Link>
          </div>
        </div>

        <div>
          <Link href="/sign-in" className="hover:text-yellow-400">
            로그인
          </Link>
        </div>
        <div>
          {loggedIn ? (
            <div>
              <Link href="/my-page" className="hover:text-yellow-400">
                마이페이지
              </Link>
              <button onClick={handleLogout} className="hover:text-yellow-400">
                로그아웃
              </button>
            </div>
          ) : (
            <Link href="/sign-in" className="hover:text-yellow-400">
              로그인
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
