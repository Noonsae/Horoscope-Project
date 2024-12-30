'use client';

import React from 'react';
import Loading from '@/app/loading';
import ErrorPage from '@/components/ui/ErrorPage';
import { useDailyResults, useYearResults } from '@/hooks/shareResult/useQuery';
import DailyResultCard from '@/app/share-result/_components/DailyResultCard';
import YearResultCard from '@/app/share-result/_components/YearResultCard';
import useAuth from '@/hooks/guestbook/useAuth';


const ResultList = () => {
  // 현재 로그인된 사용자 정보 가져오기
  const { user, isLoading: authLoading } = useAuth();

  // 로딩 중일 때
  if (authLoading) return <Loading />;

  // 사용자가 로그인되어 있지 않을 때
  if (!user) return <ErrorPage message="로그인이 필요합니다." />;

  // 회원 ID
  const userId = user.id;

  // 오늘의 운세와 올해의 운세 쿼리 실행
  const { data: dailyResults, isError: isDailyError, isPending: isDailyPending } = useDailyResults(userId);
  const { data: yearResults, isError: isYearError, isPending: isYearPending } = useYearResults(userId);

  // 로딩 상태: 두 쿼리 중 하나라도 로딩 중이라면 표시
  if (isDailyPending || isYearPending) return <Loading />;

  // 에러 상태: 두 쿼리 중 하나라도 에러가 발생하면 표시
  if (isDailyError || isYearError) return <ErrorPage />;

  // 렌더링
  return (
    <div className="flex flex-col gap-12">
      {/* Daily Results */}
      <div>
        <h2 className="text-xl font-bold mb-4">오늘의 운세</h2>
        <div className="flex flex-wrap gap-6">
          {dailyResults.map((result) => (
            <DailyResultCard key={result.id} result={result} />
          ))}
        </div>
      </div>

      {/* Year Results */}
      <div>
        <h2 className="text-xl font-bold mb-4">올해의 운세</h2>
        <div className="flex flex-wrap gap-6">
          {yearResults.map((result) => (
            <YearResultCard key={result.id} result={result} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultList;
