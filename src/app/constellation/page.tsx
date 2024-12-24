import React from 'react';

const ConstellationPage = () => {
  // 별자리 데이터 배열 (이미지와 이름 포함)
  const constellations = [
    { name: '물병자리', img: '' },
    { name: '물고기자리', img: '' },
    { name: '양자리', img: '' },
    { name: '황소자리', img: '' },
    { name: '쌍둥이자리', img: '' },
    { name: '게자리', img: '' },
    { name: '사자자리', img: '' },
    { name: '처녀자리', img: '' },
    { name: '천칭자리', img: '' },
    { name: '전갈자리', img: '' },
    { name: '사수자리', img: '' },
    { name: '염소자리', img: '' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Hero Section */}
      <div
        className="w-full flex flex-col justify-center items-center text-center"
        style={{ backgroundColor: '#9E9E9E', height: '640px' }}
      >
        <h1 className="text-4xl font-bold mb-6">점성술이란?</h1>
        <p className="text-lg w-full leading-relaxed">
          천문학적 현상과 천체의 움직임을 관찰하여 미래를 예측하는 고대 점술입니다.
          <br /> 하늘의 별자리와 행성의 움직임을 통해 인간의 성격과 운명을 해석합니다.
          <br /> 서양에서는 황도 12궁, 동양에서는 사주와 천문학적 요소를 바탕으로 사용됩니다.
        </p>
      </div>

      <div className="w-full max-w-none py-10">
        {/* Card Section */}
        <div
          className="flex flex-row-reverse rounded-lg p-6 items-center h-[640px] bg-gray-200"
          style={{ backgroundColor: '#EEEEEE' }}
        >
          <div className="w-[400px] h-[400px] rounded-lg mr-32" style={{ backgroundColor: '#9E9E9E' }}></div>
          <div className="mr-8 flex-1 flex flex-col justify-center items-center text-center">
            <h1 className="text-xl font-bold mb-6" style={{ color: '#000000' }}>
              궁금한 별자리를 선택하세요.
            </h1>
            {/* 뱃지 섹션 */}
            <div className="grid grid-cols-6 gap-4">
              {constellations.map((constellation, index) => (
                <div key={index} className="flex flex-col items-center">
                  {/* 뱃지 동글동글*/}
                  <div
                    className="w-20 h-20 rounded-full bg-gray-300"
                    style={{
                      backgroundImage: `url(${constellation.img})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                  {/* 별자리 이름 */}
                  <p className="mt-2 text-sm">{constellation.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstellationPage;
