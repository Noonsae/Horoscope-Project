//SSR 방식 랜더링
import React from 'react';

import { notFound } from 'next/navigation';
import { serverSupabase } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic'; // 동적 렌더링을 강제합니다.

async function getNewYearFortune(stellaId: string) {
  const supabase = serverSupabase();
  const { data, error } = await supabase.from('new_year_fortunes').select('content').eq('stella_id', stellaId).single();

  if (error) {
    console.error('신년 운세 데이터 불러오기 실패!', error);
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

export default async function NewYearFortunePage({ params }: { params: { id: string } }) {
  const stella = await getStella(params.id);
  const fortuneContent = await getNewYearFortune(params.id);

  if (!stella) {
    notFound();
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-2 px-4">
      <div className="text-center border border-gray-300 rounded-lg shadow-lg bg-white p-6 w-[800px] h-[500px] relative">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">{stella.name} - 신년 운세</h1>

        <div className="flex h-[350px]">
          <div className="w-1/2 pr-4 flex flex-col justify-between">
            <div className="text-left">
              <h2 className="text-xl font-semibold mb-2">{stella.name}</h2>
              <p className="text-gray-600">{fortuneContent || '신년 운세를 불러오는 데 실패했습니다.'}</p>
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
}
