'use client';

import { supabase } from '@/lib/supabase';

import { stellas as ChemiType } from '@/types/supabase';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Swal from 'sweetalert2';

const Chemi = () => {
  const router = useRouter();
  const [chemi, setChemi] = useState<ChemiType[]>([]);

  const {
    data: stellas,
    isLoading,
    error
  } = useQuery<ChemiType[]>({
    queryKey: ['stellas'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.from('stellas').select('*');
        if (error) throw new Error(error.message);
        return data || [];
      } catch (err) {
        console.error('Error fetching stellas:', err);
        throw err;
      }
    }
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-lg font-semibold">데이터를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-xl font-bold text-red-500">데이터를 불러오지 못했습니다.</h1>
        <p className="text-gray-600 mt-2">잠시 후 다시 시도해주세요.</p>
      </div>
    );
  }

  const handleSelect = (stella: ChemiType) => {
    const newChemi = [...chemi, stella];
    // 유저정보가 있으면 setchemi 에 (바로 stella) 담아서 리턴
    if (newChemi.length === 1) {
      Swal.fire({
        title: `${stella.name} 선택했습니다`,
        text: '당신의 별자리가 맞나요?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        reverseButtons: false
      }).then((result) => {
        if (result.isConfirmed) {
          setChemi(newChemi);
          Swal.fire(`${stella.name} 선택이 완료되었습니다.`);
        }
      });
    }

    if (newChemi.length === 2) {
      Swal.fire({
        title: `${stella.name} 선택했습니다`,
        text: '궁합을 알고 싶은 상대방의 별자리가 맞나요?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        reverseButtons: false
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(`${stella.name} 선택이 완료되었습니다.`);
          setChemi(newChemi);
          const params = new URLSearchParams({
            first: JSON.stringify(newChemi[0].name),
            second: JSON.stringify(newChemi[1].name)
          });
          router.push(`/chemi/result?${params.toString()}`);
        }
      });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-center">
        {chemi.length === 0
          ? '당신의 별자리를 선택해주세요'
          : chemi.length === 1
          ? '궁합을 알고 싶은 상대방의 별자리를 선택해주세요'
          : '선택이 완료되었습니다'}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {stellas?.map((p) => (
          <button
            key={p.id}
            onClick={() => handleSelect(p)}
            className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-md p-4 transition-all"
          >
            <div className="flex flex-col items-center">
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <p className="text-sm text-gray-500 mt-2">{p.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Chemi;
