'use client';

import { supabase } from '@/lib/supabase';
import { Tables } from '@/types/supabase';
import { useEffect, useState } from 'react';
import VideoBackground from './VideoBackground';

type Stella = Tables<'stellas'>;

const Constellation = () => {
  const [constellations, setConstellations] = useState<Stella[]>([]);
  const [selectConstellation, setSelectConstellation] = useState<Stella | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // stellas 테이블에서 데이터 가져오기
        const { data, error } = await supabase.from('stellas').select('*').order('id', { ascending: true });
        if (error) throw error;

        setConstellations(data || []);
      } catch (err) {
        console.error('Error fetching constellations:', err);
        setError('별자리 데이터를 불러오는 중 문제가 발생했습니다.');
      }
    };

    fetchData();
  }, []);

  if (error) {
    throw new Error(error);
  }

  return (
    <div>
      {/* Hero Section */}
      <VideoBackground />
      <div className="w-full flex flex-col justify-center items-center text-center" style={{ height: '400px' }}>
        <h2 className="text-[36px] text-white font-bold mb-6">점성술이란?</h2>
        <p className="text-[24px] text-white w-full leading-relaxed">
          천문학적 현상과 천체의 움직임을 관찰하여 미래를 예측하는 고대 점술입니다.
          <br /> 하늘의 별자리와 행성의 움직임을 통해 인간의 성격과 운명을 해석합니다.
          <br /> 서양에서는 황도 12궁, 동양에서는 사주와 천문학적 요소를 바탕으로 사용됩니다.
        </p>
      </div>

      {/* Card Section */}
      <div className="w-full bg-gradient py-20">
        <div className="max-w-[1200px] w-full mx-auto flex flex-row justify-between items-center h-[580px]">
          {/* 뱃지 article */}
          <div className="mr-8 flex-1 flex flex-col justify-center items-center text-center">
            <article>
              <h3 className="font-medium0 mb-[60px] text-white text-[34px]">궁금한 별자리를 선택하세요.</h3>
              <div className="grid grid-cols-6 gap-4">
                {constellations.map((constellation) => (
                  <div
                    key={constellation.id}
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => setSelectConstellation(constellation)}
                  >
                    {/* 뱃지 이미지 */}
                    <div
                      className="w-[60px] h-[60px] rounded-full bg-gray-300"
                      style={{
                        backgroundImage: `url(${constellation.button_img || ''})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    ></div>
                    {/* 뱃지 별자리 이름 */}
                    <p className="mt-2 text-[16px] mb-[16px] text-white">{constellation.name}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>

          {/* 별자리설명 article */}
          <div className="relative">
            <article
              className="w-[500px] h-[400px] rounded-2xl"
              style={{
                backgroundImage: selectConstellation ? `url(${selectConstellation.img_url})` : 'none', // 선택된 별자리가 없을 경우 배경 이미지 제거
                backgroundColor: selectConstellation ? 'transparent' : '#020d20',
                backgroundSize: selectConstellation ? '120% 120%' : 'contain',
                backgroundPosition: 'center',
                textAlign: 'center'
              }}
            >
              <div className="text-white flex flex-col justify-center items-center h-full">
                {selectConstellation ? (
                  <div className="p-[40px] z-10">
                    <h2 className="text-xl font-bold mb-[20px] text-[26px]">{selectConstellation.name}</h2>
                    <p className="text-[18px] font-medium">{selectConstellation.description}</p>
                  </div>
                ) : (
                  <p className="text-[26px] text-white">별자리를 선택해주세요</p>
                )}
              </div>
            </article>
            <div className="absolute left-0 top-0 w-[500px] h-[400px] rounded-2xl inset-0 bg-[rgba(0,0,0,0.4)]">
              <p className="sr-only">overlay</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Constellation;
