'use client';

import React, { useState } from 'react';
import { useSignInMutation } from '@/hooks/auth/useSignInMutation'; // React Query 훅 사용

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate, isLoading } = useSignInMutation(); // React Query의 mutation 훅

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password }); // useSignInMutation의 mutation 호출
  };

  return (
    <div className="flex justify-center items-center bg-[111]">
      <form onSubmit={handleLogin} className="bg-[#262626] p-6 rounded-lg shadow-md w-80">
        <label className="block text-white text-sm font-medium mb-2">이메일</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 rounded-md bg-gray-800 text-white focus:outline-none"
          required
        />
        <label className="block text-white text-sm font-medium mb-2 mt-4">비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 rounded-md bg-gray-800 text-white focus:outline-none"
          required
        />
        <button
          type="submit"
          className="w-full mt-6 bg-blue-500 text-white py-2 px-4 rounded-md"
          disabled={isLoading} // 로딩 중 버튼 비활성화
        >
          {isLoading ? '로그인 중...' : '로그인'}
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
