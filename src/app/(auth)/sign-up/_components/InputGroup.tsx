'use client';

import AuthForm from '@/components/forms/AuthForm';

import { User } from '@/types/auth-type/sign-in.type';
import { Session } from '@/types/zustand-type/auth-state-type';
import React, { useState } from 'react';

interface InputGroupProps {
  handleSubmit: (formData: {
    id: string;
    email: string;
    password: string;
    birthDate: string;
  }) => Promise<{ user: User | null; session: Session | null }>;
}

const InputGroup: React.FC<InputGroupProps> = ({ handleSubmit }) => {
  const [formData, setFormData] = useState({
    id: '',
    nickname: '',
    email: '',
    password: '',
    birthDate: ''
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleSubmit(formData);
      alert('회원가입 성공!');
    } catch (error: any) {
      alert('회원가입 실패: ' + error.message);
    }
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
      <AuthForm
        mode="signup" // AuthForm에 필요한 mode를 전달합니다.
        onSubmit={(data) => handleSubmit({ ...data, birthDate: formData.birthDate })}
      />
    </form>
  );
};

export default InputGroup;
