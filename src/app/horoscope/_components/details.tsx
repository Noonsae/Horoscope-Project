'use client';
import React from 'react';
import Loading from '@/app/loading';
import ErrorPage from '@/components/ui/ErrorPage';
import { useFortune } from './useFortune';

const Details: React.FC = () => {
  const {
    stella,
    isLoading,
    error,
    showFortune,
    showDailyFortune,
    fortuneContent,
    fortuneLoading,
    dailyFortuneContent,
    dailyFortuneLoading,
    handleShowFortune,
    handleShowDailyFortune,
    handleySaveResult
  } = useFortune();

  if (isLoading) return <Loading />;
  if (error) return <ErrorPage />;
  if (!stella) return <div>별자리를 찾을 수 없습니다.</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-2 px-4">
      <div className="text-center border border-gray-300 rounded-lg shadow-lg bg-white p-6 w-[800px] h-[500px] relative">
        <div className="absolute top-6 left-6 flex space-x-2">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition text-sm"
            onClick={handleShowDailyFortune}
          >
            일일 운세
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition text-sm"
            onClick={handleShowFortune}
          >
            신년 운세
          </button>
        </div>

        <h1 className="mb-6 text-2xl font-bold text-gray-800">{stella.name}</h1>

        <div className="flex h-[350px]">
          <div className="w-1/2 pr-4 flex flex-col justify-between">
            <div className="text-left">
              <h2 className="text-xl font-semibold mb-2">{stella.name}</h2>
              {showDailyFortune && dailyFortuneLoading ? (
                <p>운세 로딩 중...</p>
              ) : showDailyFortune && dailyFortuneContent ? (
                <p className="text-gray-600">{dailyFortuneContent}</p>
              ) : showFortune && fortuneLoading ? (
                <p>운세 로딩 중...</p>
              ) : showFortune && fortuneContent ? (
                <p className="text-gray-600">{fortuneContent}</p>
              ) : (
                <p className="text-gray-600">{stella.description}</p>
              )}
            </div>
            <div className="flex flex-col space-y-2">
              <button
                onClick={handleySaveResult}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
              >
                저장하기
              </button>
            </div>
          </div>

          <div className="w-1/2 pl-4">
            <div className="bg-gray-200 h-full rounded-lg flex items-center justify-center">
              <img
                style={{
                  backgroundImage: `url(${stella.img_url})`,
                  backgroundColor: 'transparent',
                  backgroundSize: '120% 120%',
                  backgroundPosition: 'center',
                  textAlign: 'center'
                }}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
