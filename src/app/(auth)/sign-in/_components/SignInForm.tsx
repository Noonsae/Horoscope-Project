'use client';

import React, { useState } from 'react';
import { useSignInMutation } from '@/hooks/auth';

const SignInForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { mutate } = useSignInMutation(); // React Query의 mutation 훅

  // 유효성 검사 함수
  const validate = (name: string, value: string): string => {
    switch (name) {
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return '유효한 이메일을 입력해주세요.';
        }
        break;
      case 'password':
        if (value.length < 8) {
          return '비밀번호는 최소 8자 이상이어야 합니다.';
        }
        break;
      default:
        break;
    }
    return '';
  };

  // 입력 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validate(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  // 로그인 요청 핸들러
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // 모든 필드 유효성 검사
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      const error = validate(key, formData[key as keyof typeof formData]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      alert('입력한 정보에 오류가 있습니다. 다시 확인해주세요.');
      return;
    }

    mutate(formData); // useSignInMutation 호출
  };

  return (
    <div className="flex justify-center items-center bg-[111]">
      <form onSubmit={handleLogin} className="bg-[#262626] p-6 rounded-lg shadow-md w-80">
        <label className="block text-white text-sm font-medium mb-2">이메일</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-md bg-gray-800 text-white focus:outline-none"
          required
          placeholder="이메일을 입력해주세요."
        />
        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}

        <label className="block text-white text-sm font-medium mb-2 mt-4">비밀번호</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-md bg-gray-800 text-white focus:outline-none"
          required
          placeholder="비밀번호를 입력해주세요."
        />
        {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}

        <button
          type="submit"
          className={`w-full mt-6 py-2 px-4 rounded-md ${
            Object.values(errors).some((error) => error)
              ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
          disabled={Object.values(errors).some((error) => error)} // 에러가 있으면 버튼 비활성화
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
