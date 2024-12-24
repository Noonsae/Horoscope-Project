import GuestbookForm from '@/app/guestbook/_components/GuestbookForm';
import GuestbookList from '@/app/guestbook/_components/GuestbookList';

const GuestbookPage = () => {
  return (
    <>
      <div className="w-full h-[150px] bg-gradient-to-b from-black to-purple-900 flex items-center justify-center">
        <h2 className="text-white text-xl font-bold text-center">
          별자리가 전해준 새해의 행운처럼, 서로에게 따뜻한 마음을 나눠보세요.
        </h2>
      </div>
      <GuestbookForm />
      <GuestbookList />
    </>
  );
};

export default GuestbookPage;
