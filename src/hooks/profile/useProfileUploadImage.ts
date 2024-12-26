import { useCallback, useEffect } from 'react';
import useAuthStore from '@/store/useAuthStore';
import browserClient from '@/lib/supabase-client';

import Swal from 'sweetalert2'; // 사용자 알림에 사용
import { User } from '@/types/user-type';

// 타입 정의
interface UseProfileUploadImageReturn {
  user: User | null;
  handleImageChange: (files: FileList) => Promise<void>;
}

export const useProfileUploadImage = (
  newProfileImg: string | File, // 업로드 중인 이미지의 URL 또는 File 객체
  setNewProfileImg: (value: string) => void // 상태 업데이트 함수
): UseProfileUploadImageReturn => {
  const user = useAuthStore((state) => state.user); // Zustand의 로그인 user 정보

  // 프로필 이미지 업로드 함수
  const handleImageChange = useCallback(
    async (files: FileList) => {
      const file = files[0];

      // 파일을 선택하지 않은 경우 함수 종료
      if (!file) {
        Swal.fire({
          icon: 'error',
          title: '이미지를 선택해주세요.',
          confirmButtonColor: '#d33'
        });
        return;
      }

      // 브라우저에서 업로드된 파일의 임시 URL 생성
      const tempImgUrl = URL.createObjectURL(file);

      // UI에 즉시 반영 (낙관적 업데이트)
      setNewProfileImg(tempImgUrl);

      try {
        // Supabase storage에 이미지 업로드
        const { data, error } = await browserClient.storage
          .from('profile_img')
          .upload(`profile_img${Date.now()}.png`, file);

        if (error) {
          throw new Error(`이미지 업로드 에러: ${error.message}`);
        }

        const newImg = `https://zvnqewxnkcdqqlskzqlz.supabase.co/storage/v1/object/public/profile_img/${data?.path}`;
        setNewProfileImg(newImg); // 업로드된 이미지 URL로 상태 업데이트

        // 성공 알림
        Swal.fire({
          icon: 'success',
          title: '이미지가 성공적으로 업로드되었습니다!',
          confirmButtonColor: '#429f50'
        });
      } catch (error: any) {
        console.error('이미지 업로드 에러:', error);

        // 에러 알림
        Swal.fire({
          icon: 'error',
          title: '이미지 업로드 실패',
          text: error.message || '다시 시도해주세요.',
          confirmButtonColor: '#d33'
        });
      }
    },
    [setNewProfileImg]
  );

  useEffect(() => {
    let tempUrl: string | undefined;

    // newProfileImg가 File 객체인 경우 URL 생성
    if (newProfileImg instanceof File) {
      tempUrl = URL.createObjectURL(newProfileImg);
    }

    // 언마운트 시, 메모리 해제
    return () => {
      if (tempUrl) {
        URL.revokeObjectURL(tempUrl);
      }
    };
  }, [newProfileImg]);

  return { user, handleImageChange };
};
