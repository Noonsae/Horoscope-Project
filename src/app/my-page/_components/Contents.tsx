import React from 'react';
import CommentList from './CommentList';
import { FortuneList } from '.';

interface ContentsProps {
  activeTab: 'fortune' | 'comments' | 'profile'; // 활성화된 탭
  comments: Array<any>; // 댓글 데이터
  newNickname: string; // 닉네임 상태
  setNewNickname: (value: string) => void; // 닉네임 상태 변경 함수
  newProfileImg: string | File | null; // 프로필 이미지 상태
  setNewProfileImg: (value: string | File | null) => void; // 프로필 이미지 변경 함수
  confirmDeleteComment: (id: string) => void; // 댓글 삭제 함수
  commentsPending: boolean; // 댓글 로딩 상태
  commentsError: boolean; // 댓글 에러 상태
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
  if (activeTab === 'fortune') {
    return <FortuneList/>;
  }

  if (activeTab === 'comments') {
    return (
      <CommentList/>
    );
  }

  if (activeTab === 'profile') {
    return (
      <div className="max-w-[600px] mx-auto mt-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert(`닉네임: ${newNickname}, 프로필 이미지 업로드 완료!`);
          }}
        >
          {/* 닉네임 변경 */}
          <div className="mb-6">
            <label className="block font-bold mb-2">닉네임 변경</label>
            <input
              type="text"
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
              placeholder="변경할 닉네임을 입력하세요."
              className="border px-4 py-2 w-full rounded"
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            저장하기
          </button>
        </form>
      </div>
    );
  }

  return null;
};

export default Contents;
