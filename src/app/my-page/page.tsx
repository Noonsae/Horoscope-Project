'use client';

import { useState } from 'react';

import { Contents, MyProfile } from './_components';

import useFetchGuestbookComments from '@/hooks/profile/useFetchGuestbookComments';
import { useUpdateProfile } from '@/hooks/profile/useUpdateProfile';
import useAuthStore from '@/store/useAuth';
import { User } from '@/types/supabase/user-type';

const MyPage = () => {
  const user = useAuthStore((state) => state.user) as User | null;
  const [activeTab, setActiveTab] = useState<'fortune' | 'comments' | 'profile'>('fortune');
  const [newProfileImg, setNewProfileImg] = useState<string | File | null>(null);
  const [newNickname, setNewNickname] = useState<string>('');

  const { comments, commentsPending, commentsError } = useFetchGuestbookComments(user?.id || null);

  const confirmDeleteComment = (id: string) => {
    if (window.confirm('댓글을 정말 삭제하시겠습니까?')) {
      console.log(`삭제할 댓글 ID: ${id}`);
      // 여기에 Supabase 삭제 로직 추가
    }
  };

  const { handleSubmit } = useUpdateProfile(
    newNickname,
    setNewNickname,
    newProfileImg,
    user || { id: '', nickname: '', profile_img: null }
  );

  return (
    <section className="min-h-screen flex flex-col">
      <article className="text-center py-10">
        <MyProfile newProfileImg={newProfileImg} setNewProfileImg={(value) => setNewProfileImg(value)} />
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
