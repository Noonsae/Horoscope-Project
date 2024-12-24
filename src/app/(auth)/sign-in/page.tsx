'use client';

import { useSignInMutation } from '@/hooks/useSignInMutation';
import Link from 'next/link';
import { useState } from 'react';

const Page: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate } = useSignInMutation();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ email, password });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-80">
        <label className="block text-gray-700 text-sm font-medium mb-2">이메일</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full px-4 py-2 border rounded-lg text-sm text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        />
        <label className="block text-gray-700 text-sm font-medium mt-4 mb-2">비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full px-4 py-2 border rounded-lg text-sm text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          className="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition"
        >
          로그인
        </button>
      </form>
      <Link href="/sign-up">
        <p>계정이 없으신가요? 회원가입하러 가기</p>
      </Link>
    </div>
  );
};

export default Page;
