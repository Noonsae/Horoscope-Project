'use client';

import clientSupabase from '@/lib/supabase-client';
import { useMutation } from '@tanstack/react-query';

export const useStellasMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await clientSupabase.from('stellas').select('*');
      if (error) {
        throw new Error(error.message || '데이터를 불러오는 데 실패했습니다.');
      }
      return data;
    }
  });
};
