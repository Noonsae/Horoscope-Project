'use server';

import { supabase } from "@/lib/supabase";

export const submitSignUp = async (formData: { name: string; email: string; password: string; birthDate: string }) => {
  // Supabase에 사용자 추가
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        name: formData.name,
        birthDate: formData.birthDate
      }
    }
  });

  if (error) {
    throw new Error(error.message || '회원가입에 실패했습니다.');
  }

  return data;
};
