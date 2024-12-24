import React from 'react';
import { FortuneList, CommentBtnList } from '.';

interface ContentsProps {
  activeTab: 'fortune' | 'comments';
}

const Contents: React.FC<ContentsProps> = ({ activeTab }) => {
  return (
    <div className="w-full h-[800px] flex items-center justify-center bg-gradient text-white">
      {activeTab === 'fortune' && <FortuneList />}
      {activeTab === 'comments' && <CommentBtnList />}
    </div>
  );
};

export default Contents;
