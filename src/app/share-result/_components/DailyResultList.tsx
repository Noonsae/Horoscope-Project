'use client';

import Loading from '@/app/loading';
import { useDailyResults } from '@/hooks/shareResult/useShareResultQuery';
import DailyResultCard from './DailyResultCard';
import ErrorPage from '@/components/ui/ErrorPage';

const DailyResultList = () => {
  const { data: dailyResults, isError, isPending } = useDailyResults();

  if (isPending) return <Loading />;
  if (isError) return <ErrorPage />;

  return (
    <div className="gap-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {dailyResults.map((result) => (
        <DailyResultCard key={result.id} result={result} />
      ))}
    </div>
  );
};

export default DailyResultList;
