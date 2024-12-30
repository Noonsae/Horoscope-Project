'use client';

import React from 'react';
import Loading from '@/app/loading';
import ErrorPage from '@/components/ui/ErrorPage';
import DailyResultCard from '@/app/share-result/_components/DailyResultCard';
import YearResultCard from '@/app/share-result/_components/YearResultCard';
import { useDailyCardList, useYearCardList } from '@/hooks/shareResult/useQuery';

const ResultList = () => {
  const { data: dailyResults, isLoading: isDailyLoading, isError: isDailyError } = useDailyCardList();
  const { data: yearResults, isLoading: isYearLoading, isError: isYearError } = useYearCardList();

  if (isDailyLoading || isYearLoading) return <Loading />;
  if (isDailyError || isYearError) return <ErrorPage />;

  return (
    <div className="flex flex-col gap-12">
      <div>
        <h2 className="text-xl font-bold mb-4">오늘의 운세</h2>
        <div className="flex flex-wrap gap-6">
          {dailyResults?.length ? (
            dailyResults.map((result) => <DailyResultCard key={result.id} result={result} />)
          ) : (
            <p className="text-gray-500">오늘의 운세 데이터가 없습니다.</p>
          )}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">올해의 운세</h2>
        <div className="flex flex-wrap gap-6">
          {yearResults?.length ? (
            yearResults.map((result) => <YearResultCard key={result.id} result={result} />)
          ) : (
            <p className="text-gray-500">올해의 운세 데이터가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultList;
