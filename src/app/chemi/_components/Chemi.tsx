'use client';

import { supabase } from '@/lib/supabase';

import { stellas as ChemiType } from '@/types/supabase';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Chemi = () => {
  const router = useRouter();
  // const [stellas, setStellas] = useState<ChemiType[]>([]);
  const [chemi, setChemi] = useState<ChemiType[]>([]);
  const { data: stellas, isLoading } = useQuery({
    queryKey: ['stellas'],
    queryFn: async () => {
      const { data, error } = await supabase.from('stellas').select('*');

      return data;
    }
  });
  // useEffect(() => {
  //   const fetchStellas = async () => {
  //     const { data, error } = await supabase.from('stellas').select('*');
  //     if (error) {
  //       console.error(error.message);
  //       return;
  //     }
  //     setStellas(data);
  //   };
  //   fetchStellas();
  // }, []);
  if (isLoading) <>"Loading..."</>;

  //슈파베이스 랑 립 뭐쓸지 뭐쓰고있는지

  const handleSelect = (stella: ChemiType) => {
    const newChemi = [...chemi, stella];

    if (newChemi.length === 1) {
      Swal.fire({
        title: `${stella.name} 선택했습니다 `,
        text: '다시 되돌릴 수 없습니다. 신중하세요.',
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
          Swal.fire(`${stella.name}선택이 완료되었습니다.`);
        }
      });
    }
    if (newChemi.length === 2) {
      Swal.fire({
        title: `${stella.name} 선택했습니다 `,
        text: '궁합을 알고싶은 상대방의 별자리가 맞나요?',
        icon: 'warning',

        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '확인',
        cancelButtonText: '취소',

        reverseButtons: false
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(`${stella.name}선택이 완료되었습니다.`);
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
