'use client';

import { useSignUpMutation } from '@/hooks/useSignUpMutation';
import ReactDayPicker from '@/library/datepicker';
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
    <div className="flex flex-col items-center justify-center">
      {!isFormComplete ? (
        <form className="flex flex-col gap-4 w-80 bg-white p-6 rounded shadow">
          <label>이메일</label>
          <input
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요."
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <label>닉네임</label>
          <input
            type="text"
            name="nickname"
            placeholder="닉네임을 입력해주세요."
            value={formData.nickname}
            onChange={handleInputChange}
            required
          />
          <label>패스워드</label>
          <input
            type="password"
            name="password"
            placeholder="패스워드를 입력해주세요."
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <label>패스워드 확인</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="패스워드를 다시 입력해주세요."
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </form>
      ) : (
        <form className="flex flex-col gap-4 w-80 bg-white p-6 rounded shadow" onSubmit={handleSubmit}>
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
  );
};

export default Page;
