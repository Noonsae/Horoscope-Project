import React from 'react';

interface UpdateProfileProps {
  newNickname: string;
  setNewNickname: (value: string) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const UpdateProfile: React.FC<UpdateProfileProps> = ({ newNickname, setNewNickname, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="rounded-xl flex flex-col items-center">
      <div className="w-[500px] flex flex-col items-start mt-4">
        <label className="text-[26px] mb-2 text-white">닉네임 변경</label>
        <input
          type="text"
          value={newNickname}
          placeholder="변경하실 닉네임을 입력해주세요."
          className="mt-1 block text-black w-full bg-white border border-gray-700 rounded-xl p-2 border-none pl-4"
          onChange={(e) => setNewNickname(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-[120px] mt-10 bg-[#EC4C4C] text-lg py-[6px] rounded-3xl hover:bg-[#B73838] font-semibold"
      >
        변경 하기
      </button>
    </form>
  );
};

export default UpdateProfile;
