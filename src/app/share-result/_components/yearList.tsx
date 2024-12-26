'use client';

import { YearList as YearListType } from '@/types/stella-result-type';
import { fetchNewYearResults } from '@/utils/shareResult';
import { useQuery } from '@tanstack/react-query';
import defaultImg from '/public/images/default.png';
import Image from 'next/image';
import changeTime from '@/utils/changeTime';

const YearList = () => {
  const {
    data: yearResults,
    isError,
    isPending
  } = useQuery<YearListType[], Error, YearListType[], [string]>({
    queryKey: ['yearResults'],
    queryFn: () => fetchNewYearResults()
  });

  if (isPending) return <div>로딩중..</div>;
  if (isError) return <div>에러 발생!</div>;

  return (
    <div className="flex flex-wrap gap-6">
      {yearResults.map((result) => (
        <div
          key={result.id}
          className="relative bg-white rounded-lg shadow-md border border-gray-300 p-4 w-[250px] h-[400px] transition-transform transform hover:scale-105"
        >
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <Image
              className="w-8 h-8 bg-gray-500 rounded-full border border-gray-300"
              src={result.users?.profile_img || defaultImg}
              alt="프로필 이미지"
              width={100}
              height={100}
            />
            <p className="font-bold text-sm text-gray-700">{result.users?.nickname}</p>
          </div>
          <div className="flex items-center justify-center h-full">
            <p className="text-center text-gray-800 leading-relaxed px-4 overflow-hidden text-ellipsis">
              {result.new_year_fortunes.content}
            </p>
          </div>
          <p className="absolute bottom-4 right-4 text-xs text-gray-500 text-center">{changeTime(result.created_at)}</p>
        </div>
      ))}
    </div>
  );
};

export default YearList;
