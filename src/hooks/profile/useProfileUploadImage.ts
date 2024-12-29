import { useCallback, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import useAuthStore from '@/store/useAuth';
import Swal from 'sweetalert2';
import { User } from '@/types/supabase/user-type';

interface UseProfileUploadImageReturn {
  user: User | null;
  handleImageChange: (files: FileList) => Promise<void>;
}

export const useProfileUploadImage = (
  newProfileImg: string | File,
  setNewProfileImg: (value: string) => void
): UseProfileUploadImageReturn => {
  const user = useAuthStore((state) => state.user);

  const handleImageChange = useCallback(async (files: FileList) => {
    const file = files[0];

    const user = useAuthStore.getState().user; // Zustand에서 유저 정보 가져오기
    if (!user?.id) {
      Swal.fire({
        icon: 'error',
        title: '로그인이 필요합니다.',
        text: '유저 정보를 확인해주세요.',
        confirmButtonColor: '#d33'
      });
      throw new Error('유저 정보가 없습니다. 로그인을 확인해주세요.');
    }

    try {
      const { data, error } = await supabase.storage
        .from('profile_images')
        .upload(`profile_img_${Date.now()}.png`, file);

      if (error) {
        throw new Error(`이미지 업로드 에러: ${error.message}`);
      }

      if (data?.path) {
        const newImg = `https://qxytgvrleqpskxcfuvja.supabase.co/storage/v1/object/public/profile_images/${data.path}`;

        // Supabase users 테이블 업데이트
        const { error: updateError } = await supabase.from('users').update({ profile_img: newImg }).eq('id', user.id);

        if (updateError) {
          throw new Error(`프로필 이미지 업데이트 실패: ${updateError.message}`);
        }

        // Zustand 상태 업데이트
        useAuthStore.getState().updateProfile(user.nickname, newImg);

        Swal.fire({
          icon: 'success',
          title: '이미지가 성공적으로 업로드되었습니다!',
          confirmButtonColor: '#429f50'
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: '업로드 실패',
        text: error.message,
        confirmButtonColor: '#d33'
      });
    }
  }, []);
  useEffect(() => {
    let tempUrl: string | undefined;

    if (newProfileImg instanceof File) {
      tempUrl = URL.createObjectURL(newProfileImg);
    }

    return () => {
      if (tempUrl) {
        URL.revokeObjectURL(tempUrl);
      }
    };
  }, [newProfileImg]);

  return { user, handleImageChange };
};
