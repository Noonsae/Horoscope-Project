'use client';

import Link from 'next/link';
import SignInForm from './_components/SignInForm';

const SignInPage: React.FC = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen w-full h-64 bg-gradient">
        <SignInForm />
        <Link href="/sign-up">
          <p className="text-sm text-center text-[#AAAAAA] mt-4 hover:underline font-bold">
            계정이 없으신가요? <span className="text-red-600"> 회원가입하러 가기 </span>
          </p>
        </Link>
      </div>
    </>
  );
};

export default SignInPage;
