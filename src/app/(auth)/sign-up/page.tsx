import React from 'react';

import SignUpForm from './_components/SignUpForm';

const SignUpPage = () => {
  
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient">
      <div className="-mt-[50px]">
        <h1 className="text-center mb-10 text-[34px] text-bold text-[#FFDA68] mb-[50px]">회원가입</h1>
        <SignUpForm />
        <p className="text-sm text-center text-gray-400 mt-[20px] hover:underline font-bold text-[16px]">
          이미 계정이 있으신가요?{' '}
          <a href="/sign-in" className="text-blue-500 text-[16px]">
            로그인하러 가기
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
