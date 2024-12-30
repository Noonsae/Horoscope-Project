import React from 'react';

interface UpdateProfileProps {
  newNickname: string;
  setNewNickname: (value: string) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const UpdateProfile: React.FC<UpdateProfileProps> = ({ newNickname, setNewNickname, handleSubmit }) => {
  return (
    <div className="max-w-[600px] mx-auto mt-10">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="mb-6 w-[400px]">
          <label className="block font-bold mb-2 text-white text-[26px]">닉네임 변경</label>
          <input
            type="text"
            value={newNickname}
            placeholder="변경하실 닉네임을 입력해주세요."
            className="mt-1 block text-black w-full bg-white border border-gray-700 rounded-[10px] p-2 pl-4"
            onChange={(e) => setNewNickname(e.target.value)}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-[10px] w-[400px]">
          저장하기
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
