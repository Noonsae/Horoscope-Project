import Link from 'next/link';
import SignInForm from './_components/SignInForm';

const SignInPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-[#111]">
      <div className="w-full max-w-md p-8 rounded-lg shadow-xl bg-[#0e0e0e]">
        <h1 className='text-white text-center mb-10 text-[26px]'>로그인을 해주세요.</h1>
        <SignInForm />
        <Link href="/sign-up">
          <p className="text-sm text-center text-gray-400 mt-4 hover:underline font-bold">
            계정이 없으신가요? <span className="text-red-600">회원가입하러 가기</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
