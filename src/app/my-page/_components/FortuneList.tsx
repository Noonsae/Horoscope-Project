const FortuneList: React.FC = () => {
  return (
    <div className="grid grid-cols-5 gap-[50px] w-[1200px] mx-auto">
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="bg-white text-gray-900 h-[300px] rounded-[10px] flex justify-center items-center relative">
          운세 카드 {i + 1}
          <button className="absolute bottom-2 right-2 text-gray-500 hover:text-red-500">삭제하기</button>
        </div>
      ))}
    </div>
  );
};

export default FortuneList;
