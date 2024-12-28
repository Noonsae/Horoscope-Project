'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { fetchStellaData } from '@/hooks/useStellaQuery';
import { useNewYearFortune } from '@/hooks/useNewYearFortuneQuery'; // Existing hook for New Year fortune
import { useNewDailyFortune } from '@/hooks/useDailyFortuneQuery';
import Loading from '@/app/loading';
import ErrorPage from '@/components/ui/ErrorPage';

const Details: React.FC = () => {
  const params = useParams();
  const id = params.id as string;

  const [stella, setStella] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFortune, setShowFortune] = useState(false); // State for New Year fortune display
  const [showDailyFortune, setShowDailyFortune] = useState(false); // State for Daily fortune display

  // Fetch Stella data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStellaData(id);
        setStella(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Use the New Year fortune query
  const { data: fortuneContent, isLoading: fortuneLoading } = useNewYearFortune(stella?.id || '');

  // Use the Daily fortune query
  const { data: dailyFortuneContent, isLoading: dailyFortuneLoading } = useNewDailyFortune(stella?.id || '');

  if (isLoading) return <Loading />;
  if (error) return <ErrorPage />;
  if (!stella) return <div>별자리를 찾을 수 없습니다.</div>;

  const handleShowFortune = () => {
    setShowFortune(true); // Show New Year fortune
    setShowDailyFortune(false); // Hide Daily fortune if it was previously shown
  };

  const handleShowDailyFortune = () => {
    setShowDailyFortune(true); // Show Daily fortune
    setShowFortune(false); // Hide New Year fortune if it was previously shown
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-2 px-4">
      <div className="text-center border border-gray-300 rounded-lg shadow-lg bg-white p-6 w-[800px] h-[500px] relative">
        <div className="absolute top-6 left-6 flex space-x-2">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition text-sm"
            onClick={handleShowDailyFortune} // Show Daily fortune on click
          >
            일일 운세
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition text-sm"
            onClick={handleShowFortune} // Show New Year fortune on click
          >
            신년 운세
          </button>
        </div>

        <h1 className="mb-6 text-2xl font-bold text-gray-800">{stella.name}</h1>

        <div className="flex h-[350px]">
          <div className="w-1/2 pr-4 flex flex-col justify-between">
            <div className="text-left">
              <h2 className="text-xl font-semibold mb-2">{stella.name}</h2>
              {/* Conditional rendering based on which fortune to show */}
              {showDailyFortune && dailyFortuneLoading ? (
                <p>운세 로딩 중...</p>
              ) : showDailyFortune && dailyFortuneContent ? (
                <p className="text-gray-600">{dailyFortuneContent}</p>
              ) : showFortune && fortuneLoading ? (
                <p>운세 로딩 중...</p>
              ) : showFortune && fortuneContent ? (
                <p className="text-gray-600">{fortuneContent}</p>
              ) : (
                <p className="text-gray-600">{stella.description}</p>
              )}
            </div>
            <div className="flex flex-col space-y-2">
              <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition">
                저장하기
              </button>
            </div>
          </div>

          <div className="w-1/2 pl-4">
            <div className="bg-gray-200 h-full rounded-lg flex items-center justify-center">
              <img src={stella.img_url} alt={stella.name} className="max-w-full max-h-full object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
