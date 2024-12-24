'use client';

import supabase from '@/supabase/supabase';
import { useEffect, useState } from 'react';

interface Stella {
  id: number;
  name: string;
  description: string;
}

const Chemi = () => {
  const [stellas, setStellas] = useState<Stella[]>([]);
  const [chemi, setChemi] = useState<Stella[]>([]);
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
  const handleSelect = (selectedStella: Stella) => {
    if (chemi.length >= 2) return;
    
    setChemi((prev) => [...prev, selectedStella]);
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
