'use client';

import Loading from '@/app/loading';
import { useDailyResults } from '@/hooks/shareResult/useQuery';
import DailyResultCard from './DailyResultCard';
import ErrorPage from '@/components/ui/ErrorPage';

const DailyResultList = () => {
  const { data: dailyResults, isError, isPending } = useDailyResults();

  if (isPending) return <Loading />;
  if (isError) return <ErrorPage />;

  return (
    <div className="flex flex-wrap gap-6">
      {dailyResults.map((result) => (
        <DailyResultCard key={result.id} result={result} />
      ))}
    </div>
  );
};

export default DailyResultList;
