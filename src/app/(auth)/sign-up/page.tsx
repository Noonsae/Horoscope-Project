'use client';

import { useSignUpMutation } from '@/hooks/useSignUpMutation';
import ReactDayPicker from '@/library/datepicker';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import InputGroup from './_components/InputGroup';
import PickerBtn from './_components/PickerBtn';
import { FormData } from '@/types/sign-up.type';

const SignUpPage: React.FC = () => {
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
          <InputGroup formData={formData} handleInputChange={handleInputChange} />
        ) : (
          <PickerBtn handleDateChange={handleDateChange} handleSubmit={handleSubmit} setFormData={setFormData} />
        )}
      </div>
    </>
  );
};

export default SignUpPage;
