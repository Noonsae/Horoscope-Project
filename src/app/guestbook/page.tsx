import GuestbookForm from '@/app/guestbook/_components/GuestbookForm';
import GuestbookList from '@/app/guestbook/_components/GuestbookList';
import GoMoveToTopButton from '@/components/ui/GoMoveToTopButton';

const GuestbookPage = () => {
  return (
    <div className="bg-gradient">
      <div className="relative">
        <div
          className="w-full h-[320px] flex items-center justify-center"
          style={{
            backgroundImage: "url('/images/guestbook.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <h2 className="text-white text-[26px] font-bold text-center z-10">
            별자리가 전해준 새해의 행운처럼, 서로에게 따뜻한 마음을 나눠보세요.
          </h2>
        </div>
        <div className="indent-[-9999px] absolute inset-0 w-full h-[320px] bg-[rgba(0,0,0,0.4)]">
          <span className="sr-only">overlay</span>
        </div>
      </div>
      <GuestbookForm />
      <GuestbookList />
      <GoMoveToTopButton />
    </div>
  );
};

export default GuestbookPage;
