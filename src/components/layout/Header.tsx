'use client';

import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { HiOutlineX, HiOutlineMenu } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<any>(null);
  const [menuToggle, setMenuToggle] = useState(false);

  const router = useRouter();

  const toggleMenu = () => {
    setMenuToggle((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuToggle((prev) => !prev);
  }
 
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
      data.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(null);
    router.push('/');
    closeMenu();
  };

  return (
    <nav className="w-full bg-gray-800 text-white">
      {/* Desktop Menu */}
      <div className="hidden md:flex justify-between items-center px-8 py-3">
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

      {/* Mobile Menu */}
      <div className="flex justify-between items-center py-4 px-6 text-foreground font-bold md:hidden">
        <Link href="/">Stella</Link>
        <button onClick={toggleMenu}>
          {menuToggle ? (
            <HiOutlineX className="text-xl text-white" />
          ) : (
            <HiOutlineMenu className="text-xl text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu Links */}
      <div
        className={`${
          menuToggle ? 'block' : 'hidden'
        } flex flex-col gap-2 md:hidden bg-gray-800 text-white font-bold px-6 py-2`}
      >
        <Link onClick={closeMenu} href="/constellation" className="hover:text-yellow-400">
          소개
        </Link>
        <Link onClick={closeMenu} href="/horoscope" className="hover:text-yellow-400">
          운세
        </Link>
        <Link onClick={closeMenu} href="/chemi" className="hover:text-yellow-400">
          궁합
        </Link>
        <Link onClick={closeMenu} href="/share-result" className="hover:text-yellow-400">
          공유
        </Link>
        <Link onClick={closeMenu} href="/guestbook" className="hover:text-yellow-400">
          덕담
        </Link>
        {isAuthenticated ? (
          <div className="flex flex-col gap-2">
            <Link onClick={closeMenu} href="/my-page" className="hover:text-yellow-400">
              마이페이지
            </Link>
            <button onClick={logout} className="hover:text-yellow-400 mr-auto">
              로그아웃
            </button>
          </div>
        ) : (
          <Link onClick={closeMenu} href="/sign-in" className="hover:text-yellow-400">
            로그인
          </Link>
        )}
      </div>
    </nav>
  );
};
export default Header;
