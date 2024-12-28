'use server';

import { supabase } from "@/lib/supabase";

export const submitSignUp = async (formData: { name: string; email: string; password: string; birth_date: string }) => {
  // Supabase에 사용자 추가
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        name: formData.name,
        birth_date: formData.birth_date
      }
    }
  });

  if (error) {
    throw new Error(error.message || '회원가입에 실패했습니다.');
  }

  return data;
};
