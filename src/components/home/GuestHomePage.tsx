'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const GuestHomePage = () => {
  return (
    <div className="w-full min-h-screen bg-gradient pb-[180px]">
      {/* Hero Section */}
      <div
        className="h-[640px] bg-cover bg-center mb-[150px]"
        style={{
          backgroundImage: "url('images/night_sky.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%'
        }}
      >
        <h1 className="text-4xl font-bold sr-only">Hero Section</h1>
      </div>

      {/* Cards Section */}
      <div className="w-full space-y-6 max-w-none">
        {/*첫번째 카드*/}
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

        {/*두번째 카드*/}
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

export default GuestHomePage;
