import { FormData } from '@/types/sign-up.type';
import React from 'react';

interface InputGroupProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputGroup: React.FC<InputGroupProps> = ({ formData, handleInputChange }) => {
  return (
    <div>
      <h1 className="text-[#FFEAB8] text-[34px] font-bold flex justify-center"> 회원가입 </h1>
      <form className="bg-[#262626] p-6 rounded-lg shadow-md w-80">
        <label className="block text-white text-sm font-medium mb-2">이메일</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="이메일을 입력해주세요."
          className="block w-full px-4 py-2 border rounded-lg text-sm text-[#F1F1F1] border-gray-300 bg-[#555555] placeholder-white"
          required
        />
        <label className="block text-white text-sm font-medium mt-4 mb-2">닉네임</label>
        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleInputChange}
          placeholder="닉네임을 입력해주세요."
          className="block w-full px-4 py-2 border rounded-lg text-sm text-[#F1F1F1] border-gray-300 bg-[#555555] placeholder-white"
          required
        />
        <label className="block text-white text-[16px] font-medium mt-4 mb-2">비밀번호</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="비밀번호를 입력해주세요."
          className="block w-full px-4 py-2 border rounded-lg text-sm text-[#F1F1F1] border-gray-300 bg-[#555555] placeholder-white"
          required
        />
        <label className="block text-white text-sm font-medium mt-4 mb-2">비밀번호 확인</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="비밀번호를 다시 입력해주세요."
          className="block w-full px-4 py-2 border rounded-lg text-sm text-[#F1F1F1] border-gray-300 bg-[#555555] placeholder-white"
          required
        />
      </form>
    </div>
  );
};

export default InputGroup;
