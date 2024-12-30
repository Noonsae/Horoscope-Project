import React, { useCallback, useMemo } from 'react';
import CommentList from './CommentList';
import { FortuneList } from '.';
import Swal from 'sweetalert2';
import { updateNickname } from '@/hooks/profile/useUpdateProfile';

interface ContentsProps {
  activeTab: 'fortune' | 'comments' | 'profile';
  comments: Array<any>;
  newNickname: string;
  setNewNickname: (value: string) => void;
  confirmDeleteComment: (id: string) => void;
  commentsPending: boolean;
  commentsError: boolean;
}

const Contents: React.FC<ContentsProps> = ({
  activeTab,
  comments,
  newNickname,
  setNewNickname,
  confirmDeleteComment,
  commentsPending,
  commentsError
}) => {
  const handleNicknameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewNickname(e.target.value);
    },
    [setNewNickname]
  );

  const handleNicknameSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

  if (activeTab === 'profile') {
    return (
      <div className="max-w-[600px] mx-auto mt-10 w-[400px]">
        <form
          className="text-center"
          onSubmit={(e) => {
            e.preventDefault();
            alert(`닉네임: ${newNickname}, 프로필 이미지 업로드 완료!`);
          }}
        >
          {/* 닉네임 변경 */}
          <div className="mb-6">
            <label className="block font-medium my-[20px] text-white text-[22px] float-left">닉네임 변경</label>
            <input
              type="text"
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
              placeholder="변경할 닉네임을 입력하세요."
              className="border px-4 py-2 w-full rounded"
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-[400px]">
            저장하기
          </button>
        </form>
      </div>
    );
  }
      if (!newNickname.trim()) {
        Swal.fire({
          icon: 'error',
          title: '닉네임을 입력해주세요.',
          confirmButtonColor: '#d33'
        });
        return;
      }

      const result = await Swal.fire({
        icon: 'warning',
        title: '닉네임을 변경하시겠습니까?',
        showCancelButton: true,
        confirmButtonColor: '#429f50',
        cancelButtonColor: '#d33',
        confirmButtonText: '변경',
        cancelButtonText: '취소'
      });

      if (result.isConfirmed) {
        const success = await updateNickname(newNickname);

        if (success) {
          Swal.fire({
            icon: 'success',
            title: '닉네임 변경 성공!',
            confirmButtonColor: '#429f50'
          }).then(() => {
            window.location.reload();
          });
        }
      }
    },
    [newNickname]
  );

  const nicknameInput = useMemo(
    () => (
      <input
        type="text"
        value={newNickname}
        onChange={handleNicknameChange}
        placeholder="변경할 닉네임을 입력하세요."
        className="border px-4 py-2 w-full rounded"
      />
    ),
    [newNickname, handleNicknameChange]
  );

  const renderActiveTab = useMemo(() => {
    if (activeTab === 'fortune') {
      return <FortuneList />;
    }

    if (activeTab === 'comments') {
      return <CommentList />;
    }

    if (activeTab === 'profile') {
      return (
        <div className="max-w-[600px] mx-auto mt-10">
          <form onSubmit={handleNicknameSubmit}>
            <div className="mb-6">
              <label className="block font-bold mb-2">닉네임 변경</label>
              {nicknameInput}
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              저장하기
            </button>
          </form>
        </div>
      );
    }

    return null;
  }, [activeTab, nicknameInput, handleNicknameSubmit]);

  return renderActiveTab;
};

export default React.memo(Contents, (prevProps, nextProps) => {
  return (
    prevProps.activeTab === nextProps.activeTab &&
    prevProps.newNickname === nextProps.newNickname &&
    prevProps.commentsPending === nextProps.commentsPending &&
    prevProps.commentsError === nextProps.commentsError &&
    prevProps.confirmDeleteComment === nextProps.confirmDeleteComment &&
    prevProps.comments === nextProps.comments
  );
});
