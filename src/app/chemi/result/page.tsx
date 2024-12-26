'use client';
import { useSearchParams } from 'next/navigation';
import { chemiData } from '../../../data/stella_info_data';

const ChemiResult = () => {
  const searchParams = useSearchParams();
  const first = JSON.parse(searchParams.get('first') || '{}');
  const second = JSON.parse(searchParams.get('second') || '{}');
  console.log('first', first);
  console.log('second', second);
  const firstStella = first;
  const secondStella = second;

  const result = chemiData[first]?.[second];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">궁합 결과</h1>
      <div className="text-center">
        <h2 className="text-xl font-semibold">
          {firstStella}와 {secondStella}의 궁합
        </h2>
        <p className="text-lg mt-2">궁합 점수: {result.percent}%</p>
        <p className="text-gray-700 mt-4">{result.description}</p>
      </div>
    </div>
  );
};

export default ChemiResult;
