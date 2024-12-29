'use client';

import React, { useEffect, useState } from 'react';
import { getStellaId } from '@/utils/stellaCalculator';
import { Tables } from '@/types/supabase/supabase-type';

import Link from 'next/link';
import Image from 'next/image';

type DailyFortune = Tables<'daily_fortunes'>;

type Props = {
  dailyFortunes: DailyFortune[];
  userMonthDay: string | null;
};

const UserHomePage = ({ dailyFortunes, userMonthDay }: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);
  useEffect(() => {
    console.log('dailyFortunes:', dailyFortunes);
    console.log('userMonthDay:', userMonthDay);
  }, [dailyFortunes, userMonthDay]);

  if (!userMonthDay) {
    return <p>별자리 정보를 찾을 수 없습니다.</p>;
  }

  // 사용자 별자리 ID 가져오기
  const stellaId = getStellaId(new Date(`2000-${userMonthDay}`)); //
  const flipCard = () => setIsFlipped((prev) => !prev);
  // stella_id 기반 오늘의 운세 찾기
  const todayFortune = dailyFortunes.find((fortune) => fortune.stella_id === stellaId);

  if (!todayFortune) {
    return <p>오늘의 운세를 찾을 수 없습니다.</p>;
  }

  return (
    <div className="w-full min-h-screen bg-gradient pb-[180px]">
      {/* Hero Section */}
      <section
        className="h-[640px] bg-cover bg-center mb-[150px]"
        style={{
          backgroundImage: "url('images/night_sky.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%'
        }}
      >
        {/* 운세 카드 */}
        <div
          className="relative top-1/4 w-[240px] h-[300px] rounded-lg shadow-lg cursor-pointer mx-auto"
          onClick={flipCard}
          style={{
            perspective: '1000px'
          }}
        >
          {/* 카드 컨테이너 */}
          <div
            className={`w-full h-full rounded-sm transform transition-transform duration-700`}
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
          >
            {/* 카드 앞면 */}
            <div
              className="absolute w-full h-full flex items-center justify-center bg-gradient rounded-md"
              style={{
                backgroundImage: "url('images/horoscope_card.webp')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%'
              }}
            >
              <p className="text-xl font-bold text-white text-shadow-2xl text-center -mt-[180px]">
                오늘의 운세를 <br></br> 확인하세요!
              </p>
            </div>

            {/* 카드 뒷면 */}
            <div
              className="absolute w-full h-full flex items-center justify-center text-[#FFDA68] bg-gradient text-center p-[30px]"
              style={{
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden'
              }}
            >
              <p className=" text-[20px]">{todayFortune?.content || '오늘의 운세를 찾을 수 없습니다.'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <div className="w-full space-y-6 max-w-none">
        {/* 첫 번째 카드 */}
        <section className="flex flex-row justify-between items-center h-[500px] max-w-[1200px] mx-auto mb-[100px]">
          <Image
            src="/images/section1.webp" // public 폴더 내 이미지 경로
            alt="Intro"
            objectFit="cover" // 이미지를 요소 크기에 맞게 조정
            quality={100} // 이미지 품질 (0 ~ 100)
            width={400}
            height={400}
          />

          <div className="flex-1 flex flex-col items-center text-center text-white max-w-[600px]">
            <h2 className="text-[26px] font-medium mb-[20px] ">당신의 별자리, 어떤 이야기를 담고 있을까요?</h2>
            <p className="text-[20px] mb-[30px]">황도 12궁 별자리에 대해 알고싶다면 버튼을 눌러보세요.</p>
            <Link
              href="/constellation"
              className="inline-block text-black py-3 px-5 rounded-md hover:bg-gray-400"
              style={{
                backgroundColor: '#D9D9D9',
                width: '200px',
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              별자리 보러가기
            </Link>
          </div>
        </section>

        {/* 두 번째 카드 */}
        <section className="flex flex-row justify-between items-center h-[500px] max-w-[1200px] mx-auto mb-[150px]">
          <div className="flex-1 flex flex-col items-center text-center text-white max-w-[600px]">
            <h2 className="text-[26px] font-medium mb-[20px]">별자리가 알려주는 나만의 행운은?</h2>
            <p className="text-[20px] mb-[30px]">당신의 별자리 운세로 더 특별하고 의미있게 만들어보세요!</p>
            <Link
              href="/horoscope"
              className="inline-block text-black py-3 px-5 rounded-md hover:bg-gray-400"
              style={{
                backgroundColor: '#D9D9D9',
                width: '200px',
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              운세 보러가기
            </Link>
          </div>
          <Image
            src="/images/section2.webp" // public 폴더 내 이미지 경로
            alt="horoscope"
            // 이미지를 요소 크기에 맞게 조정
            quality={100} // 이미지 품질 (0 ~ 100)
            width={400}
            height={400}
          />
        </section>

        {/*세번째 카드*/}
        <section className="flex flex-row justify-between items-center h-[600px] max-w-[1200px] mx-auto my-[50px]">
          <Image
            src="/images/section3.webp" // public 폴더 내 이미지 경로
            alt="chemistry"
            // 이미지를 요소 크기에 맞게 조정
            quality={100} // 이미지 품질 (0 ~ 100)
            width={400}
            height={400}
          />
          <div className="flex-1 flex flex-col items-center text-center text-white max-w-[600px] ">
            <h2 className="text-[26px] font-medium mb-[20px] ">별자리가 알려주는 우리 둘의 케미는?</h2>
            <p className="text-[20px] mb-[30px]">이 사람, 나와 정말 잘 맞을까? 별자리 궁합으로 확인하세요.</p>
            <Link
              href="/chemi"
              className="inline-block text-black py-3 px-5 rounded-md hover:bg-gray-400"
              style={{
                backgroundColor: '#D9D9D9',
                width: '200px',
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              궁합 보러가기
            </Link>
          </div>
        </section>

        {/*네번째 카드*/}
        <section className="flex flex-row justify-between items-center h-[600px] max-w-[1200px] mx-auto my-[50px]">
          <div className="flex-1 flex flex-col items-center text-center text-white max-w-[600px] ">
            <h2 className="text-[26px] font-medium mb-[20px] ">별자리처럼 반짝이는 새해의 덕담</h2>
            <p className="text-[20px] mb-[30px]">
              별자리가 전해준 새해의 행운처럼,
              <br />
              서로에게 따뜻한 마음을 나눠보세요.
            </p>
            <Link
              href="/guestbook"
              className="inline-block text-black py-3 px-5 rounded-md hover:bg-gray-400"
              style={{
                backgroundColor: '#D9D9D9',
                width: '200px',
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              덕담 나누기
            </Link>
          </div>
          <Image
            src="/images/section4.webp" // public 폴더 내 이미지 경로
            alt="chemistry"
            // 이미지를 요소 크기에 맞게 조정
            quality={100} // 이미지 품질 (0 ~ 100)
            width={400}
            height={400}
          />
        </section>
      </div>
    </div>
  );
};

export default UserHomePage;
