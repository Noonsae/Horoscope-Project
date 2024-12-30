import React from 'react';

import SignUpForm from './_components/SignUpForm';

const SignUpPage = () => {
  
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-gray-800">
        <h1 className="text-white text-center mb-8 text-2xl font-bold">회원가입</h1>
        <SignUpForm/>
        <p className="text-sm text-center text-gray-400 mt-4">
          이미 계정이 있으신가요?{' '}
          <a href="/sign-in" className="text-blue-500 font-medium hover:underline">
            로그인하러 가기
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
