'use client';

import React from 'react';
import Loading from '@/app/loading';
import ErrorPage from '@/components/ui/ErrorPage';
import { useDailyResults, useYearResults } from '@/hooks/shareResult/useShareResultQuery';
import DailyResultCard from '@/app/share-result/_components/DailyResultCard';
import YearResultCard from '@/app/share-result/_components/YearResultCard';

const ResultList = () => {
  const { data: dailyResults, isLoading: isDailyLoading, isError: isDailyError } = useDailyResults();
  const { data: yearResults, isLoading: isYearLoading, isError: isYearError } = useYearResults();

  if (isDailyLoading || isYearLoading) return <Loading />;
  if (isDailyError || isYearError) return <ErrorPage message="데이터를 가져오는 중 오류가 발생했습니다." />;

  return (
    <div className="flex flex-col gap-12">
      <div className="mt-10">
        <h2 className="text-[26px] font-bold mb-4 text-white">오늘의 운세</h2>
        <div className=" gap-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {dailyResults?.length ? (
            dailyResults.map((result) => <DailyResultCard key={result.id} result={result} />)
          ) : (
            <p className="text-gray-500">오늘의 운세 데이터가 없습니다.</p>
          )}
        </div>
      </div>
      <hr className="mt-[30px]" />
      <div className="mt-10">
        <h2 className="text-[26px] font-bold mb-4 text-white">올해의 운세</h2>
        <div className="gap-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
