'use client';

import React from 'react';

import useFetchFortuneResults from '@/hooks/useFetchFortuneResults';

const FortuneList: React.FC = () => {
  const { dailyResults, newYearResults, isLoading, isError } = useFetchFortuneResults();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );

  if (isError)
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 font-bold">Error loading fortune results.</p>
        <button onClick={() => window.location.reload()} className="btn-retry">
          Retry
        </button>
      </div>
    );

  return (
    <div className="grid grid-cols-5 gap-[50px] w-[1200px] mx-auto">
      {dailyResults.map((result) => (
        <div
          key={result.id}
          className="bg-white text-gray-900 h-[300px] rounded-[10px] flex justify-center items-center relative shadow-lg hover:shadow-xl transition-all"
        >
          Daily Fortune ID: {result.daily_fortune_id}
          <button className="absolute bottom-2 right-2 text-gray-500 hover:text-red-500">삭제하기</button>
        </div>
      ))}

      {newYearResults.map((result) => (
        <div
          key={result.id}
          className="bg-white text-gray-900 h-[300px] rounded-[10px] flex justify-center items-center relative shadow-lg hover:shadow-xl transition-all"
        >
          New Year Fortune ID: {result.new_year_fortune_id}
          <button className="absolute bottom-2 right-2 text-gray-500 hover:text-red-500">삭제하기</button>
        </div>
      ))}
    </div>
  );
};

export default FortuneList;