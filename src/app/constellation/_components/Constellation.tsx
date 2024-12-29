'use client';

import { supabase } from '@/lib/supabase';

import { Tables } from '@/types/supabase/supabase-type';
import { useEffect, useState } from 'react';

type Stella = Tables<'stellas'>;

const Constellation = () => {
  const [constellations, setConstellations] = useState<Stella[]>([]);
  const [selectConstellation, setSelectConstellation] = useState<Stella | null>(null);

  // 현재 supabase에 이미지가 없어서 null값 지정. 이미지 추가 후 수정예정

  useEffect(() => {
    const fetchConstellations = async () => {
      const { data } = await supabase.from('stellas').select('*');
      setConstellations(data || []);
    };

    fetchConstellations();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Hero Section */}
      <div
        className="w-full flex flex-col justify-center items-center text-center"
        style={{ backgroundColor: '#9E9E9E', height: '400px' }}
      >
        <h1 className="text-4xl font-bold mb-6">점성술이란?</h1>
        <p className="text-lg w-full leading-relaxed">
          천문학적 현상과 천체의 움직임을 관찰하여 미래를 예측하는 고대 점술입니다.
          <br /> 하늘의 별자리와 행성의 움직임을 통해 인간의 성격과 운명을 해석합니다.
          <br /> 서양에서는 황도 12궁, 동양에서는 사주와 천문학적 요소를 바탕으로 사용됩니다.
        </p>
      </div>

      {/* 여기까진 완료 */}

      <div className="w-full max-w-none py-10">
        {/* Card Section */}
        <div
          className="flex flex-row-reverse rounded-lg p-6 items-center h-[640px] bg-gray-200"
          style={{ backgroundColor: '#EEEEEE' }}
        >
          <div
            className="w-[400px] h-[400px] rounded-lg mr-32"
            style={{
              backgroundColor: '#9E9E9E',
              backgroundImage: `url(${selectConstellation?.img_url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              textAlign: 'center'
            }}
          >
            <div className="flex flex-col justify-center items-center h-full">
              <h2 className="texl-xl font-bold mb-4" style={{ color: '#000000' }}>
                {selectConstellation?.name}
              </h2>
              <p className="text-lg" style={{ color: '#000000' }}>
                {selectConstellation?.description}
              </p>
            </div>
          </div>
          <div className="mr-8 flex-1 flex flex-col justify-center items-center text-center">
            <h1 className="text-xl font-bold mb-6" style={{ color: '#000000' }}>
              궁금한 별자리를 선택하세요.
            </h1>

            {/* 뱃지 섹션 */}
            <div className="grid grid-cols-6 gap-4">
              {constellations.map((constellation) => (
                <div
                  key={constellation.id}
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => setSelectConstellation(constellation)}
                >
                  {/* 뱃지 동글동글*/}
                  <div
                    className="w-20 h-20 rounded-full bg-gray-300"
                    style={{
                      backgroundImage: `url(${constellation.img_url || ''})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                  {/* 뱃지 별자리 이름 */}
                  <p className="mt-2 text-sm">{constellation.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Constellation;
