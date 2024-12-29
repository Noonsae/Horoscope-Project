import React from 'react';
import { FortuneList, CommentList } from './'; // 각 콘텐츠 컴포넌트 임포트
import { Comment } from '@/types/supabase/guestbook-type'; // Comment 타입 임포트

interface ContentsProps {
  activeTab: 'fortune' | 'comments' | 'profile';
  comments: Comment[];
  newProfileImg: string | File | null;
  confirmDeleteComment: (id: string) => void;
  newNickname: string;
  setNewNickname: (value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>; // 수정된 부분
  commentsPending: boolean;
  commentsError: boolean;
}

const Contents: React.FC<ContentsProps> = ({
  activeTab,
  comments,
  newProfileImg,
  confirmDeleteComment,
  newNickname,
  setNewNickname,
  handleSubmit,
  commentsPending,
  commentsError
}) => {
  return (
    <div className="w-full h-[800px]">
      {activeTab === 'fortune' && <FortuneList />}
      {activeTab === 'comments' && (
        <>
          {commentsPending ? (
            <p>로딩중입니다...</p>
          ) : commentsError ? (
            <p className="font-semibold">댓글 데이터를 가져오는 중 에러가 발생했습니다.</p>
          ) : (
            <CommentList
              comments={comments}
              newProfileImg={newProfileImg}
              confirmDeleteComment={confirmDeleteComment}
            />
          )}
        </>
      )}
      {activeTab === 'profile' && (
        <div>
          {activeTab === 'profile' && (
            <form onSubmit={handleSubmit}>
              <p>프로필 변경</p>
              <input
                type="text"
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
                placeholder="변경하실 닉네임을 입력해주세요."
              />
              <button type="submit">프로필 저장</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Contents;
