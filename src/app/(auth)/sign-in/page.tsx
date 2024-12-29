import Link from 'next/link';
import SignInForm from './_components/SignInForm';

const SignInPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient">
      <div className="-mt-[50px]">
        <h1 className="text-center mb-10 text-[34px] text-bold text-[#FFDA68] mb-[50px]">로그인을 해주세요.</h1>
        <SignInForm />
        <Link href="/sign-up">
          <p className="text-sm text-center text-gray-400 mt-4 hover:underline font-bold text-[16px] mt-[50px]">
            계정이 없으신가요? <span className="text-red-600 text-[16px]">회원가입하러 가기</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
