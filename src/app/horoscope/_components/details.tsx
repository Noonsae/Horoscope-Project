'use client'; //별자리 설명 기능떄문에 있는로직직
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { fetchStellaData } from '@/hooks/useStellaQuery';
import { useNewYearFortune } from '@/hooks/useNewYearFortuneQuery';
export const dynamic = 'force-dynamic'; // 신년운세버튼에만 적용시키려는 용도로 있는 로직직

const Details: React.FC = () => {
  const params = useParams();
  const id = params.id as string;

  const [stella, setStella] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFortune, setShowFortune] = useState(false); // State to control fortune visibility

  // Fetch stella data
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

  // Use new year fortune query
  const { data: fortuneContent, isLoading: fortuneLoading } = useNewYearFortune(stella?.id || '');

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error}</div>;
  if (!stella) return <div>별자리를 찾을 수 없습니다.</div>;

  const handleShowFortune = () => {
    setShowFortune(true); // Show fortune when button is clicked
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-2 px-4">
      <div className="text-center border border-gray-300 rounded-lg shadow-lg bg-white p-6 w-[800px] h-[500px] relative">
        <div className="absolute top-6 left-6 flex space-x-2">
          <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition text-sm">
            일일 운세
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition text-sm"
            onClick={handleShowFortune} // Handle click event
          >
            신년 운세
          </button>
        </div>

        <h1 className="mb-6 text-2xl font-bold text-gray-800">{stella.name}</h1>

        <div className="flex h-[350px]">
          <div className="w-1/2 pr-4 flex flex-col justify-between">
            <div className="text-left">
              <h2 className="text-xl font-semibold mb-2">{stella.name}</h2>
              {/* Show fortune content if available */}
              {showFortune && fortuneLoading ? (
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

// import React from 'react';

// const Details = () => {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 py-2 px-4">
//       <div className="text-center border border-gray-300 rounded-lg shadow-lg bg-white p-6 w-[800px] h-[500px] relative">
//         {/* 상단 왼쪽 버튼 영역 */}
//         <div className="absolute top-6 left-6 flex space-x-2">
//           <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition text-sm">
//             일일 운세
//           </button>
//           <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition text-sm">
//             신년 운세
//           </button>
//         </div>

//         <h1 className="mb-6 text-2xl font-bold text-gray-800">디테일 페이지</h1>

//         <div className="flex h-[350px]">
//           {/* 왼쪽 설명 섹션 */}
//           <div className="w-1/2 pr-4 flex flex-col justify-between">
//             <div className="text-left">
//               <h2 className="text-xl font-semibold mb-2">별자리이름</h2>
//               <p className="text-gray-600">오늘은 작은 기쁨이 곳곳에 숨겨져 있으니 놓치지 마세요.</p>
//             </div>
//             <div className="flex flex-col space-y-2">
//               <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition">
//                 저장하기
//               </button>
//             </div>
//           </div>

//           {/* 오른쪽 이미지 섹션 */}
//           <div className="w-1/2 pl-4">
//             <div className="bg-gray-200 h-full rounded-lg flex items-center justify-center">
//               <span className="text-gray-500">이미지 영역</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Details;
