'use client';
import { useSearchParams } from 'next/navigation';

import { STELLA_INFO_DATA } from '@/data/stella_info_data';

const ChemiResult = () => {
  const searchParams = useSearchParams();
  const first = JSON.parse(searchParams.get('first')!);
  const second = JSON.parse(searchParams.get('second')!);
  const firstStella = first;
  const secondStella = second;

  const result = STELLA_INFO_DATA[first]?.[second];

  return (
    <div className="w-full min-h-[calc(100vh-280px)] bg-gradient flex flex-col justify-center items-center text-white">
      <div className="text-center">
        <h2 className="text-[34px] font-medium mb-[60px]">
          {firstStella}와 {secondStella}의 궁합 결과입니다.
        </h2>
        <div className="relative">
          <div
            className="w-[800px] h-[400px] rounded-[20px] flex flex-col items-center justify-center text-white"
            style={{
              backgroundImage: "url('/images/chemi.webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <p className="text-[34px] mb-[16px] z-10 text-[#FFDA68] -mt-[30px]">궁합 점수: {result.percent}%</p>
            <p className="text-[26px] z-10 ">{result.description}</p>
          </div>

          <div className="indent-[-9999px] absolute inset-0 w-full h-full bg-[rgba(0,0,0,0.4)]">
            <span className="sr-only">overlay</span>
          </div>

          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default ChemiResult;
