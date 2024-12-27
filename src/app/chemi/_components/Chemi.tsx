'use client';


import { supabase } from '@/lib/supabase';
import { Chemi as ChemiType } from '@/types/chemi-type';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Chemi = () => {
  const router = useRouter();
  const [stellas, setStellas] = useState<ChemiType[]>([]);
  const [chemi, setChemi] = useState<ChemiType[]>([]);
  useEffect(() => {
    const fetchStellas = async () => {
      const { data, error } = await supabase.from('stellas').select('*');
      if (error) {
        console.error(error.message);
        return;
      }
      setStellas(data);
    };
    fetchStellas();
  }, []);
  const handleSelect = (stella: ChemiType) => {
    const newChemi = [...chemi, stella];

    if (newChemi.length === 1) {
      Swal.fire({
        title: `${stella.name} 선택했습니다 `,
        text: '다시 되돌릴 수 없습니다. 신중하세요.',
        icon: 'warning',

        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
        cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
        confirmButtonText: '확인', // confirm 버튼 텍스트 지정
        cancelButtonText: '취소', // cancel 버튼 텍스트 지정

        reverseButtons: false // 버튼 순서 거꾸로
      }).then((result) => {
        // 만약 Promise리턴을 받으면,
        if (result.isConfirmed) {
          // 만약 모달창에서 confirm 버튼을 눌렀다면
          setChemi(newChemi);
          Swal.fire(`${stella.name}선택이 완료되었습니다.', 'success`);
        }
      });
    }
    if (newChemi.length === 2) {
      Swal.fire({
        title: `${stella.name} 선택했습니다 `,
        text: '궁합을 알고싶은 상대방의 별자리가 맞나요?',
        icon: 'warning',

        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: '#3085d6', // confrim 버튼 색깔 지정
        cancelButtonColor: '#d33', // cancel 버튼 색깔 지정
        confirmButtonText: '확인', // confirm 버튼 텍스트 지정
        cancelButtonText: '취소', // cancel 버튼 텍스트 지정

        reverseButtons: false // 버튼 순서 거꾸로
      }).then((result) => {
        // 만약 Promise리턴을 받으면,
        if (result.isConfirmed) {
          // 만약 모달창에서 confirm 버튼을 눌렀다면
          Swal.fire(`${stella.name}선택이 완료되었습니다.', 'success`);
          setChemi(newChemi);
        }
      });
    }
    const params = new URLSearchParams({
      first: JSON.stringify(newChemi[0].name),
      second: JSON.stringify(newChemi[1].name)
    });
    router.push(`/chemi/result?${params.toString()}`);
  };
  // 서치파람스로 url 에 정보넣어서 보내거나
  // 스윗알럿 2개떳을떄 ok를 눌렀을떄 이제 newChemi가 추가되야하는데데
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
        {stellas.map((p) => (
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
