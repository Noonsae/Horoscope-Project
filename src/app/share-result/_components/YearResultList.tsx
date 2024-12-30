'use client';

import Loading from '@/app/loading';
import { useYearResults } from '@/hooks/shareResult/useShareResultQuery';
import YearResultCard from './YearResultCard';
import ErrorPage from '@/components/ui/ErrorPage';

const YearResultList = () => {
  const { data: yearResults, isError, isPending } = useYearResults();

  if (isPending) return <Loading />;
  if (isError) return <ErrorPage />;

  return (
    <div className="gap-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {yearResults.map((result) => (
        <YearResultCard key={result.id} result={result} />
      ))}
    </div>
  );
};

export default YearResultList;
