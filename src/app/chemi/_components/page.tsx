'use client';
import supabase from '@/supabase/supabase';
import { useEffect, useState } from 'react';

const Chemi = () => {
  const [stellas, setStellas] = useState([]);
  const [chemi, setChemi] = useState([]);
  // 배열에 비어 있으면 첫번째 텍스트
  // 배열에 값이 있으면 두번째 텍스트

  useEffect(() => {
    const fetchStellas = async () => {
      const { data, error } = await supabase.from('stellas').select('*');
      if (error) {
        console.error(error.message);
        return;
      }
      console.log(data);
      setStellas(data);
    };
    fetchStellas();
  }, []);

  //   const clickEvent = (selectedStella) => {
  //     if (chemi.length < 2 && !chemi.includes(selectedStella)) {
  //       setChemi([...chemi, selectedStella]);
  //     }
  //   };
  return (
    <div>
      {stellas?.map((p) => {
        return (
          //   <button onClick={() => clickEvent(p)}>
          <div key={p.id}>
            <h1>{p.name}</h1>
            <p>{p.description}</p>
          </div>
          //   </button>
        );
      })}
    </div>
  );
};

export default Chemi;
