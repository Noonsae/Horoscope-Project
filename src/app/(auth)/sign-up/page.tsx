'use client';

import { useSignUpMutation } from '@/hooks/useSignUpMutation';
import ReactDayPicker from '@/components/ui/ReactDayPicker';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

interface FormData {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  birth_date: Date | null;
}

const Page: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    birth_date: null
  });

  const signUpMutation = useSignUpMutation();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (selectedDate: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      birth_date: selectedDate
    }));
    console.log('생년월일 선택됨:', selectedDate); // 디버깅용
  };

  const isFormComplete =
    formData.email &&
    formData.nickname &&
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.birth_date) {
      Swal.fire('오류 발생', '생년월일을 선택해 주세요.', 'error');
      return;
    }

    signUpMutation.mutate(
      {
        email: formData.email,
        password: formData.password,
        nickname: formData.nickname,
        birth_date: formData.birth_date
      },
      {
        onSuccess: () => {
          Swal.fire('회원가입 성공', '환영합니다!', 'success');
          router.push('/sign-in');
        },
        onError: (error: unknown) => {
          const errorMessage = error instanceof Error ? error.message : '회원가입 중 문제가 발생했습니다.';
          Swal.fire('오류 발생', errorMessage, 'error');
        }
      }
    );
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen w-full h-64 bg-gradient">
        {!isFormComplete ? (
          <form className="bg-[#262626] p-6 rounded-lg shadow-md w-80">
            <label className="block text-white text-sm font-medium mb-2">이메일</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="이메일을 입력해주세요."
              className="block w-full px-4 py-2 border rounded-lg text-sm text-gray-900 border-gray-300 bg-[#555555]"
              required
            />
            <label className="block text-white text-sm font-medium mt-4 mb-2">닉네임</label>
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleInputChange}
              placeholder="닉네임을 입력해주세요."
              className="block w-full px-4 py-2 border rounded-lg text-sm text-gray-900 border-gray-300 bg-[#555555]"
              required
            />
            <label className="block text-white text-sm font-medium mt-4 mb-2">비밀번호</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="비밀번호를 입력해주세요."
              className="block w-full px-4 py-2 border rounded-lg text-sm text-gray-900 border-gray-300 bg-[#555555]"
              required
            />
            <label className="block text-white text-sm font-medium mt-4 mb-2">비밀번호 확인</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="비밀번호를 다시 입력해주세요."
              className="block w-full px-4 py-2 border rounded-lg text-sm text-gray-900 border-gray-300 bg-[#555555]"
              required
            />
          </form>
        ) : (
          <form className="flex flex-col gap-4 w-1 bg-white p-6 rounded shadow" onSubmit={handleSubmit}>
            <ReactDayPicker onDateChange={handleDateChange} />
            <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
              회원가입 하기
            </button>
            <button
              type="button"
              className="mt-2 bg-gray-500 text-white py-2 px-4 rounded"
              onClick={() =>
                setFormData({
                  email: '',
                  nickname: '',
                  password: '',
                  confirmPassword: '',
                  birth_date: null
                })
              }
            >
              뒤로 가기
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default Page;
