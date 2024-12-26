import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuthStore from '@/store/useAuthStore';
import browserClient from '@/lib/supabase-client';
import { User } from '@/types/user-type';

interface UseUpdateProfileReturn {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export const useUpdateProfile = (
  newNickname: string,
  setNewNickname: (value: string) => void,
  newProfileImg: string | File | null,
  user: User | null // user가 null일 가능성 처리
): UseUpdateProfileReturn => {
  const queryClient = useQueryClient();

  const updateUserInfo = useCallback(
    async (currentUserId: string) => {
      // `newProfileImg` 타입 변환
      const profileImageUrl = typeof newProfileImg === 'string' ? newProfileImg : null;

      // Supabase 업데이트
      const { error } = await browserClient
        .from('users')
        .update({
          profile_image_url: profileImageUrl, // File 객체는 null로 변환
          nickname: newNickname
        })
        .eq('id', currentUserId);

      if (error) {
        console.error('유저 정보 업데이트 에러:', error);
        throw new Error('프로필 업데이트에 실패했습니다.');
      }

      // Zustand 상태 업데이트
      useAuthStore.getState().updateProfile(newNickname, profileImageUrl);

      // React Query 캐시 무효화
       queryClient.invalidateQueries({
         queryKey: ['users', currentUserId] // 쿼리 키 명확히 설정
       });
    },
    [newNickname, newProfileImg, queryClient]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!newNickname.trim()) {
        Swal.fire({
          icon: 'error',
          title: '닉네임을 입력해주세요.',
          confirmButtonColor: '#d33'
        });
        return;
      }

      // user가 null인지 확인
      if (!user?.id) {
        Swal.fire({
          icon: 'error',
          title: '유저 정보가 없습니다.',
          confirmButtonColor: '#d33'
        });
        return;
      }

      const result = await Swal.fire({
        icon: 'warning',
        title: '프로필을 변경하시겠습니까?',
        showCancelButton: true,
        confirmButtonColor: '#429f50',
        cancelButtonColor: '#d33',
        confirmButtonText: '변경',
        cancelButtonText: '취소'
      });

      if (result.isConfirmed) {
        await updateUserInfo(user.id);

        Swal.fire({
          icon: 'success',
          title: '프로필 변경 성공!',
          confirmButtonColor: '#429f50'
        });

        // 닉네임 초기화
        setNewNickname('');
      }
    },
    [newNickname, updateUserInfo, user, setNewNickname]
  );

  return { handleSubmit };
};
