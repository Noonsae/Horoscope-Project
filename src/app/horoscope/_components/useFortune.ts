import { useAddNewDailyResultMutation } from '@/hooks/horoscope/useAddNewDailyResult';
import { useAddNewYearResultMutation } from '@/hooks/horoscope/useAddNewYearResult';
import { useNewDailyFortune } from '@/hooks/horoscope/useDailyFortuneQuery';
import { useNewYearFortune } from '@/hooks/horoscope/useNewYearFortuneQuery';
import { fetchStellaData } from '@/hooks/horoscope/useStellaQuery';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export const useFortune = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const addNewYearMutation: any = useAddNewYearResultMutation(id);
  const addNewDailyMutation: any = useAddNewDailyResultMutation(id);
  const [stella, setStella] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFortune, setShowFortune] = useState(false);
  const [showDailyFortune, setShowDailyFortune] = useState(false);
  const [currentFortuneType, setCurrentFortuneType] = useState<'newYear' | 'daily' | null>(null);

  const { data: fortuneContent, isLoading: fortuneLoading } = useNewYearFortune(stella?.id || '');
  const { data: dailyFortuneContent, isLoading: dailyFortuneLoading } = useNewDailyFortune(stella?.id || '');

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

  const handleShowFortune = () => {
    setShowFortune(true);
    setShowDailyFortune(false);
    setCurrentFortuneType('newYear');
  };

  const handleShowDailyFortune = () => {
    setShowDailyFortune(true);
    setShowFortune(false);
    setCurrentFortuneType('daily');
  };

  const handleySaveResult = async () => {
    console.log('Saving result for:', currentFortuneType);

    if (currentFortuneType === 'newYear') {
      await addNewYearMutation.mutateAsync(id);
    } else if (currentFortuneType === 'daily') {
      await addNewDailyMutation.mutateAsync(id);
    }

    router.push('/share-result');
  };

  return {
    stella,
    isLoading,
    error,
    showFortune,
    showDailyFortune,
    currentFortuneType,
    fortuneContent,
    fortuneLoading,
    dailyFortuneContent,
    dailyFortuneLoading,
    handleShowFortune,
    handleShowDailyFortune,
    handleySaveResult
  };
};
