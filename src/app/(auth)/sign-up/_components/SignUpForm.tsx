'use client';

import React, { useState } from 'react';
import { useSignUpMutation } from '@/hooks/auth';
import PickerBtn from './PickerBtn';
import { SignUpPayload } from '@/types/auth-type/sign-up.type';

export interface FormData {
  email: string;
  nickname: string;
  password: string;
  checkPassword: string;
  birth_date: string | null;
}

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    nickname: '',
    password: '',
    checkPassword: '',
    birth_date: null
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPicker, setShowPicker] = useState(false);
  const { mutate } = useSignUpMutation();

  const validate = (name: string, value: string): string => {
    switch (name) {
      case 'email':
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (!isValidEmail) return '유효한 이메일을 입력해주세요.';
        break;
      case 'nickname':
        if (!value.trim()) return '닉네임을 입력해주세요.';
        if (value.length > 10) return '닉네임은 최대 10자 이하여야 합니다.';
        break;
      case 'password':
        if (value.length < 8) return '비밀번호는 최소 8자 이상이어야 합니다.';
        break;
      case 'checkPassword':
        if (value !== formData.password) return '비밀번호가 일치하지 않습니다.';
        break;
      case 'birth_date':
        if (!value) return '생년월일을 선택해주세요.';
        break;
      default:
        break;
    }
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validate(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleDateChange = (selectedDate: Date | null) => {
    const formattedDate = selectedDate ? selectedDate.toISOString().split('T')[0] : null;
    setFormData((prev) => ({ ...prev, birth_date: formattedDate }));

    const error = validate('birth_date', formattedDate || '');
    setErrors((prevErrors) => ({ ...prevErrors, birth_date: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach((key) => {
      const error = validate(key, formData[key as keyof FormData]?.toString() || '');
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      alert('입력한 정보에 오류가 있습니다. 다시 확인해주세요.');
      return;
    }

    const payload: SignUpPayload = {
      ...formData,
      birth_date: formData.birth_date || ''
    };

    mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="w-[400px] p-6 rounded-lg shadow-md w-80 border border-[#aaa]">
      {!showPicker ? (
        <>
          <label className="block text-white text-sm font-medium my-[20px] text-[16px]">이메일</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none"
            required
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}

          <label className="block text-white text-sm font-medium mb-2 mt-4">닉네임</label>
          <input
            type="text"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none"
            required
          />
          {errors.nickname && <p className="text-sm text-red-500 mt-1">{errors.nickname}</p>}

          <label className="block text-white text-sm font-medium mb-2 mt-4">비밀번호</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none"
            required
          />
          {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}

          <label className="block text-white text-sm font-medium mb-2 mt-4">비밀번호 확인</label>
          <input
            type="password"
            name="checkPassword"
            value={formData.checkPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md bg-gray-700 text-white focus:outline-none"
            required
          />
          {errors.checkPassword && <p className="text-sm text-red-500 mt-1">{errors.checkPassword}</p>}

          <label className="block text-white text-sm font-medium mb-2 mt-4">생년월일</label>
          <button
            type="button"
            className="w-full py-2 px-4 rounded-md bg-gray-600 text-white hover:bg-gray-700"
            onClick={() => setShowPicker(true)}
          >
            생년월일 선택
          </button>
          {errors.birth_date && <p className="text-sm text-red-500 mt-1">{errors.birth_date}</p>}

          <button
            type="submit"
            className={`w-full mt-6 py-2 px-4 rounded-md ${
              Object.values(errors).some((error) => error)
                ? 'bg-gray-500 cursor-not-allowed text-gray-300'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
            disabled={Object.values(errors).some((error) => error)} // 오류가 있으면 비활성화
          >
            다음
          </button>
        </>
      ) : (
        <PickerBtn handleDateChange={handleDateChange} setFormData={setFormData} setShowPicker={setShowPicker} />
      )}
    </form>
  );
};

export default SignUpForm;
