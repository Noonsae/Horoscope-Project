//ISR 랜더링 방식식
import React from 'react';

import { notFound } from 'next/navigation';
import { serverSupabase } from '@/lib/supabase-server';

export const revalidate = 86400;

async function getNewDailyFortune(stellaId: string) {
  const supabase = serverSupabase();
  const { data, error } = await supabase.from('daily_fortunes').select('content').eq('stella_id', stellaId).single();

  if (error) {
    console.error('일일 운세 데이터 불러오기 실패!', error);
    return null;
  }

  return data?.content || null;
}

async function getStella(id: string) {
  const supabase = serverSupabase();
  const { data, error } = await supabase.from('stellas').select('*').eq('id', id).single();

  if (error) {
    console.error('별자리 데이터 불러오기 실패!', error);
    return null;
  }

  return data;
}

export default async function NewDailyFortunePage({ params }: { params: { id: string } }) {
  const Dailystella = await getStella(params.id);
  const DailyfortuneContent = await getNewDailyFortune(params.id);

  if (!Dailystella) {
    notFound();
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-2 px-4">
      <div className="text-center border border-gray-300 rounded-lg shadow-lg bg-white p-6 w-[800px] h-[500px] relative">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">{Dailystella.name} - 일일 운세</h1>

        <div className="flex h-[350px]">
          <div className="w-1/2 pr-4 flex flex-col justify-between">
            <div className="text-left">
              <h2 className="text-xl font-semibold mb-2">{Dailystella.name}</h2>
              <p className="text-gray-600">{DailyfortuneContent || '신년 운세를 불러오는 데 실패했습니다.'}</p>
            </div>
          </div>

          <div className="w-1/2 pl-4">
            <div className="bg-gray-200 h-full rounded-lg flex items-center justify-center">
              <img
                style={{
                  backgroundImage: `url(${Dailystella.img_url})`, 
                  backgroundColor: 'transparent',
                  backgroundSize: '120% 120%',
                  backgroundPosition: 'center',
                  textAlign: 'center'
                }}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
