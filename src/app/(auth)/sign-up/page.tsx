import React from 'react';
import InputGroup from './_components/InputGroup';
import { submitSignUp } from './actions';

const SignUpPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full h-64 bg-gradient">
      <InputGroup handleSubmit={submitSignUp} />
            <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 mt-4">
        회원가입
      </button>
    </div>
  );
};

export default SignUpPage;
