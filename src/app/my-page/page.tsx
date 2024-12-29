'use client';

import { useState, useMemo, useCallback } from 'react';
import { Contents, MyProfile } from './_components';
import useFetchGuestbookComments from '@/hooks/profile/useFetchGuestbookComments';
import { useUpdateProfile } from '@/hooks/profile/useUpdateProfile';
import useAuthStore from '@/store/useAuth';
import { User } from '@/types/supabase/user-type';

const DEFAULT_PROFILE_IMAGE =
  'https://qxytgvrleqpskxcfuvja.supabase.co/storage/v1/object/public/profile_images/default_profile_img.webp';

const MyPage = () => {
  const user = useAuthStore((state) => state.user) as User | null;
  const [activeTab, setActiveTab] = useState<'fortune' | 'comments' | 'profile'>('fortune');
  const [newProfileImg, setNewProfileImg] = useState<string | File | null>(null);
  const [newNickname, setNewNickname] = useState<string>('');

  const { comments, commentsPending, commentsError } = useFetchGuestbookComments(user?.id || null);

  // 프로필 이미지 생성 (useMemo로 고정)
  const profileImgSrc = useMemo(() => {
    return newProfileImg instanceof File
      ? URL.createObjectURL(newProfileImg)
      : user?.profile_img || DEFAULT_PROFILE_IMAGE;
  }, [newProfileImg, user?.profile_img]);

  // 댓글 삭제 함수 (useCallback으로 고정)
  const confirmDeleteComment = useCallback((id: string) => {
    if (window.confirm('댓글을 정말 삭제하시겠습니까?')) {
      console.log(`삭제할 댓글 ID: ${id}`);
      // 여기서 Supabase 삭제 로직 추가
    }
  }, []);

  // 프로필 업데이트 훅 사용
  const { handleSubmit } = useUpdateProfile(
    newNickname,
    setNewNickname,
    newProfileImg,
    user || { id: '', nickname: '', profile_img: null }
  );

  return (
    <section className="min-h-screen flex flex-col">
      <article className="text-center py-10">
        {/* MyProfile 컴포넌트에 기본 프로필 이미지 전달 */}
        <MyProfile newProfileImg={profileImgSrc} setNewProfileImg={setNewProfileImg} />
      </article>

      <article className="max-w-[1200px] mx-auto flex flex-row justify-start gap-4 py-4">
        <button
          className={`px-6 py-2 rounded ${
            activeTab === 'fortune' ? 'bg-gray-800 text-white' : 'bg-gray-300 hover:bg-gray-400'
          }`}
          onClick={() => setActiveTab('fortune')}
        >
          운세 기록
        </button>
        <button
          className={`px-6 py-2 rounded ${
            activeTab === 'comments' ? 'bg-gray-800 text-white' : 'bg-gray-300 hover:bg-gray-400'
          }`}
          onClick={() => setActiveTab('comments')}
        >
          댓글 내역
        </button>
        <button
          className={`px-6 py-2 rounded ${
            activeTab === 'profile' ? 'bg-gray-800 text-white' : 'bg-gray-300 hover:bg-gray-400'
          }`}
          onClick={() => setActiveTab('profile')}
        >
          정보 수정
        </button>
      </article>

      <Contents
        activeTab={activeTab}
        comments={comments || []}
        newProfileImg={newProfileImg}
        confirmDeleteComment={confirmDeleteComment}
        newNickname={newNickname}
        setNewNickname={setNewNickname}
        handleSubmit={handleSubmit}
        commentsPending={commentsPending}
        commentsError={commentsError}
      />
    </section>
  );
};

export default MyPage;
