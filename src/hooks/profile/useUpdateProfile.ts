import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAuthStore from '@/store/useAuth';
import { User } from '@/types/supabase/user-type';
import { supabase } from '@/lib/supabase';

interface UseUpdateProfileReturn {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

// 닉네임 업데이트 함수
export const updateNickname = async (newNickname: string): Promise<boolean> => {
  const user = useAuthStore.getState().user; // 상태에서 직접 user 가져오기
  if (!user?.id) {
    Swal.fire({
      icon: 'error',
      title: '유저 정보가 없습니다.',
      confirmButtonColor: '#d33'
    });
    return false;
  }

  const { error } = await supabase.from('users').update({ nickname: newNickname }).eq('id', user.id);

  if (error) {
    Swal.fire({
      icon: 'error',
      title: '이미 사용 중인 닉네임입니다.',
      confirmButtonColor: '#d33'
    });
    return false;
  }

  // Zustand 상태를 명시적으로 업데이트하지 않음
  Swal.fire({
    icon: 'success',
    title: '닉네임이 성공적으로 변경되었습니다.',
    confirmButtonColor: '#3085d6'
  });

  return true;
};

// useUpdateProfile 훅
export const useUpdateProfile = (
  newNickname: string,
  setNewNickname: (value: string) => void,
  newProfileImg: string | File | null,
  user: User | null // 유저 정보
): UseUpdateProfileReturn => {
  const queryClient = useQueryClient();

  const updateUserInfo = useCallback(
    async (currentUserId: string) => {
      const profileImageUrl = typeof newProfileImg === 'string' ? newProfileImg : null;

      // 닉네임 중복 검사
      const nicknameUpdated = await updateNickname(newNickname);
      if (!nicknameUpdated) {
        throw new Error('닉네임 중복으로 업데이트 실패');
      }

      // Supabase 업데이트
      const { error } = await supabase
        .from('users')
        .update({
          profile_image_url: profileImageUrl,
          nickname: newNickname
        })
        .eq('id', currentUserId);

      if (error) {
        Swal.fire({
          icon: 'error',
          title: '프로필 업데이트에 실패했습니다.',
          confirmButtonColor: '#d33'
        });
        throw new Error('프로필 업데이트 실패');
      }

      // Zustand 상태 업데이트
      useAuthStore.getState().updateProfile(newNickname, profileImageUrl);

      // React Query 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: ['users', currentUserId]
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
        try {
          await updateUserInfo(user.id);

          Swal.fire({
            icon: 'success',
            title: '프로필 변경 성공!',
            confirmButtonColor: '#429f50'
          });

          setNewNickname('');
        } catch (error: any) {
          Swal.fire({
            icon: 'error',
            title: error.message || '업데이트 실패',
            confirmButtonColor: '#d33'
          });
        }
      }
    },
    [newNickname, updateUserInfo, user, setNewNickname]
  );

  return { handleSubmit };
};
