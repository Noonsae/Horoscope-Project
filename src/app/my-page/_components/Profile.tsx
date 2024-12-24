import React from 'react';

const Profile: React.FC = () => {
  return (
    <div className="text-center">
      {/* 프로필 사진 업로드 */}
      <label
        htmlFor="profile-upload"
        className="w-[150px] h-[150px] rounded-full bg-gray-400 mx-auto flex items-center justify-center text-gray-700 text-4xl cursor-pointer hover:bg-gray-300"
      >
        +
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              const file = e.target.files[0];
              console.log('Selected file:', file);
              // 파일 처리 로직 추가 (예: 이미지 미리보기 또는 서버 업로드)
            }
          }}
        />
      </label>
      <p className="mt-4 text-xl font-bold">User_name</p>
    </div>
  );
};

export default Profile;
