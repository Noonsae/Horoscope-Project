import React from 'react';
import Link from 'next/link';

const UserHomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Hero Section */}
      <div
        className="w-full text-center py-20 mb-10 max-w-none"
        style={{ backgroundColor: '#9E9E9E', height: '640px' }}
      >
        <h1 className="text-4xl font-bold">Hero</h1>
      </div>

      {/* Cards Section */}
      <div className="w-full space-y-6 max-w-none">
        {/*첫번째 카드*/}
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

        {/*두번째 카드*/}
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
              href="/compati"
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
