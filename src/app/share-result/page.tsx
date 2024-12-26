'use client';

import React, { useState } from 'react';
import DailyList from './_components/dailyList';
import YearList from './_components/yearList';

const ShareResultsPage = () => {
  const [activeTab, setActiveTab] = useState<'daily' | 'year'>('daily');

  return (
    <>
      <div className="w-full h-[150px] bg-gradient-to-b from-black to-purple-900 flex items-center justify-center">
        <h2 className="text-white text-xl font-bold text-center">
          별자리가 들려준 이야기를 다른 사람과 공유해보세요.
        </h2>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-start mb-8">
          <button
            className={`${
              activeTab === 'daily' ? 'bg-purple-900' : 'bg-gray-500'
            } hover:bg-purple-900 text-white font-bold py-2 px-4 rounded mr-4`}
            onClick={() => setActiveTab('daily')}
          >
            일일운세
          </button>
          <button
            className={`${
              activeTab === 'year' ? 'bg-purple-900' : 'bg-gray-500'
            } hover:bg-purple-900 text-white font-bold py-2 px-4 rounded`}
            onClick={() => setActiveTab('year')}
          >
            신년운세
          </button>
        </div>

        {activeTab === 'daily' && <DailyList />}
        {activeTab === 'year' && <YearList />}
      </div>
    </>
  );
};

export default ShareResultsPage;
