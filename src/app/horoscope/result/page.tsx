import React from 'react';

const page = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 상단 버튼 */}
      <div className="flex justify-start mb-8">
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4">일일운세</button>
        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">신년운세</button>
      </div>

      {/* 카드 그리드 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {/* 36개의 카드 반복 */}
        {/* 예시로 36개의 카드를 생성합니다 */}
        {/* 실제 데이터로 대체하실 때는 서버 사이드 렌더링이나 JavaScript를 사용하여 동적으로 생성하시면 됩니다 */}
        {/* 카드 1 */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-bold text-lg mb-2">운세 #1</h3>
          <p className="text-gray-600">행운이 가득한 하루가 될 것입니다.</p>
        </div>
        {/* 카드 2 */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-bold text-lg mb-2">운세 #2</h3>
          <p className="text-gray-600">새로운 기회가 찾아올 것입니다.</p>
        </div>
        {/* 추가 카드들... */}
        {/* 카드 36 */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-bold text-lg mb-2">운세 #36</h3>
          <p className="text-gray-600">긍정적인 마음가짐이 중요합니다.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-bold text-lg mb-2">운세 #2</h3>
          <p className="text-gray-600">새로운 기회가 찾아올 것입니다.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-bold text-lg mb-2">운세 #2</h3>
          <p className="text-gray-600">새로운 기회가 찾아올 것입니다.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-bold text-lg mb-2">운세 #2</h3>
          <p className="text-gray-600">새로운 기회가 찾아올 것입니다.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-bold text-lg mb-2">운세 #2</h3>
          <p className="text-gray-600">새로운 기회가 찾아올 것입니다.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-bold text-lg mb-2">운세 #2</h3>
          <p className="text-gray-600">새로운 기회가 찾아올 것입니다.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-bold text-lg mb-2">운세 #2</h3>
          <p className="text-gray-600">새로운 기회가 찾아올 것입니다.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-bold text-lg mb-2">운세 #2</h3>
          <p className="text-gray-600">새로운 기회가 찾아올 것입니다.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-bold text-lg mb-2">운세 #2</h3>
          <p className="text-gray-600">새로운 기회가 찾아올 것입니다.</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-bold text-lg mb-2">운세 #2</h3>
          <p className="text-gray-600">새로운 기회가 찾아올 것입니다.</p>
        </div>
      </div>
    </div>
  );
};

export default page;
