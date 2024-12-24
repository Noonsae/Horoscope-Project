import React from 'react';

const Details = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-2 px-4">
      <div className="text-center border border-gray-300 rounded-lg shadow-lg bg-white p-6 w-[800px] h-[500px] relative">
        {/* 상단 왼쪽 버튼 영역 */}
        <div className="absolute top-6 left-6 flex space-x-2">
          <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition text-sm">
            일일 운세
          </button>
          <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition text-sm">
            신년 운세
          </button>
        </div>

        <h1 className="mb-6 text-2xl font-bold text-gray-800">디테일 페이지</h1>

        <div className="flex h-[350px]">
          {/* 왼쪽 설명 섹션 */}
          <div className="w-1/2 pr-4 flex flex-col justify-between">
            <div className="text-left">
              <h2 className="text-xl font-semibold mb-2">별자리이름</h2>
              <p className="text-gray-600">오늘은 작은 기쁨이 곳곳에 숨겨져 있으니 놓치지 마세요.</p>
            </div>
            <div className="flex flex-col space-y-2">
              <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition">
                저장하기
              </button>
            </div>
          </div>

          {/* 오른쪽 이미지 섹션 */}
          <div className="w-1/2 pl-4">
            <div className="bg-gray-200 h-full rounded-lg flex items-center justify-center">
              <span className="text-gray-500">이미지 영역</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
