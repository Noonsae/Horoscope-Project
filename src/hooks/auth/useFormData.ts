import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { FormData } from '@/types/auth-type/sign-up.type';
import useSignUpMutation from './useSignUpMutation';

const useFormData = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    nickname: '',
    password: '',
    checkPassword: '',
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
    formData.checkPassword &&
    formData.password === formData.checkPassword;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.birth_date) {
      Swal.fire('오류 발생', '생년월일을 선택해 주세요.', 'error');
      return;
    }

    // birth_date를 ISO 문자열로 변환
    const formattedBirthDate = formData.birth_date.toISOString().split('T')[0];

    signUpMutation.mutate(
      {
        email: formData.email,
        password: formData.password,
        checkPassword: formData.checkPassword, // 추가된 필드
        nickname: formData.nickname,
        birth_date: formattedBirthDate // 문자를 형식에 맞게 변환 후 전달
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

  return { formData, handleInputChange, handleDateChange, handleSubmit, isFormComplete, setFormData };
};

export default useFormData;
