'use client';
import React from 'react';
import { useParams } from 'next/navigation';

const zodiacSigns = [
  { id: '0796176d-8d17-4e0d-8c50-138f2beb60ec', name: '물고기자리', start: '02-19', end: '03-20' },
  { id: '2f1cf84f-828c-4d43-9393-730410c6beb4', name: '물병자리', start: '01-20', end: '02-18' },
  { id: '3bc8f1f1-f5a3-4d16-936a-66e011201adf', name: '양자리', start: '03-21', end: '04-19' },
  { id: '3fa104df-19e4-4864-83ac-b5a6b3e4a05b', name: '황소자리', start: '04-20', end: '05-20' },
  { id: '489b37ee-5435-4cb8-813d-7827a9aa37f0', name: '쌍둥이자리', start: '05-21', end: '06-20' },
  { id: '50adecf9-1c3d-4e0b-8f4e-dfac24dee14c', name: '게자리', start: '06-21', end: '07-22' },
  { id: '5f3b9201-51f1-4924-ad1e-462e7abdad5c', name: '사자자리', start: '07-23', end: '08-22' },
  { id: '60f1b661-d592-447d-991b-1faacf1e9351', name: '처녀자리', start: '08-23', end: '09-22' },
  { id: '639d73d5-8fd4-49f6-96f9-728c63de26dd', name: '천칭자리', start: '09-23', end: '10-22' },
  { id: '7b9f0220-5b4f-46fc-b568-0c73346c1d6f', name: '전갈자리', start: '10-23', end: '11-21' },
  { id: 'a3e06765-2e0e-49a0-885e-85c890dbb168', name: '사수자리', start: '11-22', end: '12-21' },
  { id: 'ba84f353-766b-454e-8d97-46792ccf2dde', name: '염소자리', start: '12-22', end: '01-19' }
];

const Details = () => {
  const params = useParams();
  const id = params.id as string;

  const zodiac = zodiacSigns.find((sign) => sign.id === id);

  if (!zodiac) {
    return <div>별자리를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-2 px-4">
      <div className="text-center border border-gray-300 rounded-lg shadow-lg bg-white p-6 w-[800px] h-[500px] relative">
        <div className="absolute top-6 left-6 flex space-x-2">
          <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition text-sm">
            일일 운세
          </button>
          <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition text-sm">
            신년 운세
          </button>
        </div>

        <h1 className="mb-6 text-2xl font-bold text-gray-800">{zodiac.name} 운세</h1>

        <div className="flex h-[350px]">
          <div className="w-1/2 pr-4 flex flex-col justify-between">
            <div className="text-left">
              <h2 className="text-xl font-semibold mb-2">{zodiac.name}</h2>
              <p className="text-gray-600">
                기간: {zodiac.start} ~ {zodiac.end}
              </p>
              <p className="text-gray-600">오늘은 작은 기쁨이 곳곳에 숨겨져 있으니 놓치지 마세요.</p>
            </div>
            <div className="flex flex-col space-y-2">
              <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition">
                저장하기
              </button>
            </div>
          </div>

          <div className="w-1/2 pl-4">
            <div className="bg-gray-200 h-full rounded-lg flex items-center justify-center">
              <span className="text-gray-500">이미지 영역</span>
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
