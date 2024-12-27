'use client';

import Loading from '@/app/loading';
import { useYearResults } from '@/hooks/shareResult/useQuery';
import YearResultCard from './YearResultCard';
import ErrorPage from '@/components/ui/ErrorPage';

const YearResultList = () => {
  const { data: yearResults, isError, isPending } = useYearResults();

  if (isPending) return <Loading />;
  if (isError) return <ErrorPage />;

  return (
    <div className="flex flex-wrap gap-6">
      {yearResults.map((result) => (
        <YearResultCard key={result.id} result={result} />
      ))}
    </div>
  );
};

export default YearResultList;
