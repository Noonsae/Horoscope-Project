import React, { useState } from 'react';
import { getStellaId } from '@/hooks/useStellaHelpers';
import { Tables } from '@/types/supabase-type';
import Link from 'next/link';

type DailyFortune = Tables<'daily_fortunes'>;

type Props = {
  dailyFortunes: DailyFortune[];
  userMonthDay: string | null;
};

const UserHomePage = ({ dailyFortunes, userMonthDay }: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!userMonthDay) {
    return <p>별자리 정보를 찾을 수 없습니다.</p>;
  }

  const stellaId = getStellaId(new Date(`2000-${userMonthDay}`));

  const flipCard = () => setIsFlipped((prev) => !prev);

  const todayFortune = dailyFortunes.find((fortune) => fortune.stella_id === stellaId);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Hero Section */}
      <div
        className="w-full text-center py-8 mb-10 max-w-none bg-gradient-to-b from-black to-purple-900 "
        style={{ height: '400px' }}
      >
        <h2 className="text-white text-xl font-bold">오늘의 운세</h2>

        {/* 운세 카드 */}
        <div
          className="relative w-[200px] mt-10 h-[250px] rounded-lg shadow-lg cursor-pointer mx-auto"
          onClick={flipCard}
          style={{
            perspective: '1000px' 
          }}
        >
          {/* 카드 컨테이너 */}
          <div
            className={`w-full h-full rounded-lg bg-white transform transition-transform duration-700`}
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
          >
            {/* 카드 앞면 */}
            <div
              className="absolute w-full h-full flex items-center justify-center text-black bg-white rounded-lg border border-gray-300"
              style={{
                backfaceVisibility: 'hidden'
              }}
            >
              <p className="text-xl font-bold">
                오늘의 운세를 <br></br> 확인하세요!
              </p>
            </div>

            {/* 카드 뒷면 */}
            <div
              className="absolute w-full h-full flex items-center justify-center text-black bg-gray-100 rounded-lg border border-gray-300"
              style={{
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden'
              }}
            >
              <p className="text-lg">{todayFortune?.content || '오늘의 운세를 찾을 수 없습니다.'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="w-full space-y-6 max-w-none mt-10">
        {/* 첫 번째 카드 */}
        <div className="flex rounded-lg p-6 items-center h-[640px] bg-gray-200" style={{ backgroundColor: '#EEEEEE' }}>
          <div className="w-[400px] h-[400px] rounded-lg ml-32" style={{ backgroundColor: '#9E9E9E' }}></div>
          <div className="mr-8 flex-1 flex flex-col justify-center items-center text-center">
            <h1 className="text-xl font-bold mb-2" style={{ color: '#000000' }}>
              당신의 별자리, 어떤 이야기를 담고 있을까요?
            </h1>
            <p className="text-lg mb-6" style={{ color: '#000000' }}>
              황도 12궁 별자리에 대해 알고싶다면 버튼을 눌러보세요.
            </p>
            <Link
              href="/constellation"
              className="inline-block text-black py-3 px-5 rounded-md hover:bg-gray-400"
              style={{
                backgroundColor: '#D9D9D9',
                width: '200px',
                height: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              별자리 보러가기
            </Link>
          </div>
        </div>

        {/* 두 번째 카드 */}
        <div
          className="flex flex-row-reverse rounded-lg p-6 items-center h-[640px] bg-gray-200"
          style={{ backgroundColor: '#EEEEEE' }}
        >
          <div className="w-[400px] h-[400px] rounded-lg mr-32" style={{ backgroundColor: '#9E9E9E' }}></div>
          <div className="mr-8 flex-1 flex flex-col justify-center items-center text-center">
            <h1 className="text-xl font-bold mb-2" style={{ color: '#000000' }}>
              별자리처럼 반짝이는 새해의 덕담
            </h1>
            <p className="text-lg mb-6" style={{ color: '#000000' }}>
              별자리가 전해준 새해의 행운처럼, 서로에게 따뜻한 마음을 나눠보세요.
            </p>
            <Link
              href="/guestbook"
              className="inline-block text-black py-3 px-5 rounded-md hover:bg-gray-400"
              style={{
                backgroundColor: '#D9D9D9',
                width: '200px',
                height: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              덕담 나누기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
