'use client';
import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import ReactDayPicker from '@/app/horoscope/_components/dayPicker';
import { getStellaId } from '@/utils/stellaCalculator';

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <div className="flex items-center justify-center h-screen py-2 px-4">
        <div className="flex flex-col text-center border border-gray-300 rounded-lg shadow-lg bg-white p-6 w-[700px] h-[600px]">
          <h1 className="mb-4 text-2xl font-bold">당신의 운세를 확인해보세요</h1>
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
    </QueryClientProvider>
  );
};

export default HoroscopePage;

// //SSG 방식 렌더링
// //날짜를 정하고 제출하기를 눌렀을떄
// //디테일 페이지로 넘어가고 디테일페이지에 아이디가 일치하는 별자리 특징이 나오게 하면될듯듯

// 'use client';
// import React from 'react';
// import ReactDayPicker from '@/app/horoscope/_components/dayPicker';

// const page = () => {
//   const handleSubmit = (event: any) => {
//     event.preventdefault();
//   };
//   return (
//     <div className="flex items-center justify-center h-screen py-2 px-4">
//       <div className="flex flex-col text-center border border-gray-300 rounded-lg shadow-lg bg-white p-6 w-[700px] h-[600px]">
//         {' '}
//         {/* 높이를 600px로 증가 */}
//         <h1 className="mb-4 text-2xl font-bold">당신의 운세를 확인해보세요</h1>
//         <form onSubmit={handleSubmit} className="flex flex-col items-center justify-between flex-grow">
//           <div className="bg-white-500 rounded-lg p-4 w-[600px] h-[500px] flex flex-col items-center justify-between">
//             {' '}
//             {/* 높이를 500px로 증가 */}
//             <div className="flex items-center justify-center flex-grow">
//               <ReactDayPicker />
//             </div>
//             <div className="w-full flex justify-center mt-4">
//               {' '}
//               {/* margin-top 추가 */}
//               <button type="submit" className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-600 transition">
//                 운세확인하기
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default page;
