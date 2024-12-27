'use client';

import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // 초기 유저 상태 가져오기
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setIsAuthenticated(data.user);
    };
    fetchUser();

    // 로그인/로그아웃 상태 변화 감지
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(session?.user || null);
    });

    // 컴포넌트 언마운트 시 구독 해제
    return () => {
      data.subscription.unsubscribe()
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(null);
    router.push('/');
  };

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
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link href="/my-page" className="hover:text-yellow-400">
                마이페이지
              </Link>
              <button onClick={logout} className="hover:text-yellow-400">
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
