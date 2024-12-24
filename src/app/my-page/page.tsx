'use client';

import { useState } from 'react';

import { Profile, Contents } from './_components';

const MyPage = () => {
  const [activeTab, setActiveTab] = useState<'fortune' | 'comments'>('fortune');

  return (
    <div className="min-h-screen flex flex-col">
      {/* 프로필 섹션 */}
      <div className="text-center py-10">
        <Profile />
      </div>

      {/* 탭 메뉴 */}
      <div className="max-w-[1200px] mx-auto flex flex-row justify-start gap-4 py-4">
        <button
          className={`px-6 py-2 rounded ${
            activeTab === 'fortune' ? 'bg-gray-800 text-white' : 'bg-gray-300 hover:bg-gray-400'
          }`}
          onClick={() => setActiveTab('fortune')}
        >
          오늘의 운세 기록 보기
        </button>
        <button
          className={`px-6 py-2 rounded ${
            activeTab === 'comments' ? 'bg-gray-800 text-white' : 'bg-gray-300 hover:bg-gray-400'
          }`}
          onClick={() => setActiveTab('comments')}
        >
          덕담나누기 기록 보기
        </button>
      </div>

      {/* 탭 콘텐츠 */}
      <Contents activeTab={activeTab} />
    </div>
  );
}

export default MyPage