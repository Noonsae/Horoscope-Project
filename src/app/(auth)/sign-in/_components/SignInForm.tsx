import { useSignInMutation } from '@/hooks/signIn/useSignInMutation';
import React, { useState } from 'react';

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate } = useSignInMutation();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <div>
      <form onSubmit={handleLogin} className="bg-[#262626] p-6 rounded-lg shadow-md w-80">
        <label className="block text-white text-sm font-medium mb-2">이메일</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="아이디를 입력해주세요."
          className="block w-full px-4 py-2 border rounded-lg text-sm bg-[#555555] text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        />
        <label className="block text-white text-sm font-medium mt-4 mb-2">비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요."
          className="block w-full px-4 py-2 border rounded-lg text-sm bg-[#555555] text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          className="w-full mt-6 bg-[#A82626] text-[#F0F0F0] py-2 rounded-lg focus:ring-4 transition font-bold"
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
