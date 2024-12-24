'use client';
//SSG 방식 렌더링

import React from 'react';
import ReactDayPicker from '@/app/horoscope/_components/dayPicker';

const page = () => {
  return (
    <div className="flex items-center justify-center h-screen py-2 px-4">
      <div className="flex flex-col text-center border border-gray-300 rounded-lg shadow-lg bg-white p-6 w-[700px] h-[600px]">
        {' '}
        {/* 높이를 600px로 증가 */}
        <h1 className="mb-4 text-2xl font-bold">당신의 운세를 확인해보세요</h1>
        <form className="flex flex-col items-center justify-between flex-grow">
          <div className="bg-white-500 rounded-lg p-4 w-[600px] h-[500px] flex flex-col items-center justify-between">
            {' '}
            {/* 높이를 500px로 증가 */}
            <div className="flex items-center justify-center flex-grow">
              <ReactDayPicker />
            </div>
            <div className="w-full flex justify-center mt-4">
              {' '}
              {/* margin-top 추가 */}
              <button className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-600 transition">
                운세확인하기
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
