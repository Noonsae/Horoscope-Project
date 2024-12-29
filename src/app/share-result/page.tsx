'use client';

import React, { useState } from 'react';
import DailyList from './_components/DailyResultList';
import YearList from './_components/YearResultList';
import GoMoveToTopButton from '@/components/ui/GoMoveToTopButton';
import YearResultList from './_components/YearResultList';
import DailyResultList from './_components/DailyResultList';

const ShareResultsPage = () => {
  const [activeTab, setActiveTab] = useState<'daily' | 'year'>('daily');

  return (
    <div className="bg-gradient pb-200px;">
      <section
        className="w-full h-[150px] bg-gradient flex items-center justify-center h-[320px] mb-[100px]"
        style={{
          backgroundImage: "url('/images/share.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <h2 className="text-white text-[26px] font-bold text-center">
          별자리가 들려준 이야기를 다른 사람과 공유해보세요.
        </h2>
      </section>

      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-start mb-8">
          <button
            className={`${
              activeTab === 'daily' ? 'bg-blue-500' : 'bg-gray-600'
            } hover:bg-blue-500 text-white font-bold py-2 px-4 rounded mr-4`}
            onClick={() => setActiveTab('daily')}
          >
            일일운세
          </button>
          <button
            className={`${
              activeTab === 'year' ? 'bg-blue-500' : 'bg-gray-600'
            } hover:bg-blue-500 text-white font-bold py-2 px-4 rounded`}
            onClick={() => setActiveTab('year')}
          >
            신년운세
          </button>
        </div>

        {activeTab === 'daily' && <DailyResultList />}
        {activeTab === 'year' && <YearResultList />}
        <GoMoveToTopButton />
      </div>
    </div>
  );
};

export default ShareResultsPage;
