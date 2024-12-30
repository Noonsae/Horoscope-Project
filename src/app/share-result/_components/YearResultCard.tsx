"use client"

import Image from 'next/image';
import { memo, useMemo } from 'react';
import defaultImg from '/public/images/default_profile_img.webp';
import changeTime from '@/utils/changeTime';
import { YearList } from '@/types/supabase';


type DailyResultCardProps = {
  result: YearList;
};

const YearResultCard = memo(({ result }: DailyResultCardProps) => {

  return (
    <div
      key={result.id}
      className="relative bg-gray-100 rounded-lg shadow-md border border-gray-300 p-4 w-[250px] h-[400px] transition-transform transform hover:scale-105"
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
  );
});

export default YearResultCard;
