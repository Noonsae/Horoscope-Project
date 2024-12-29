'use client';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import ReactDayPicker from '@/app/horoscope/_components/dayPicker';
import { getStellaId } from '@/utils/stellaCalculator';


const HoroscopePage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedDate) {
      const stellaId = getStellaId(selectedDate);
      router.push(`/horoscope/${stellaId}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient">
      <div className="flex flex-col text-center rounded-[20px] -mt-[100px] shadow-lg bg-white w-[700px] h-[600px] py-[30px]">
        <h1 className="text-[34px] font-bold">당신의 운세를 확인해보세요</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-between flex-grow">
          <div className="bg-white-500 rounded-lg p-4 w-[600px] h-[500px] flex flex-col items-center justify-between">
            <div className="flex items-center justify-center flex-grow">
              <ReactDayPicker onDateSelect={setSelectedDate} />
            </div>
            <div className="w-full flex justify-center mt-4">
              <button
                type="submit"
                className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-600 transition"
                disabled={!selectedDate}
              >
                운세확인하기
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HoroscopePage;
