'use client';

import React, { useMemo } from 'react';
import { useProfileUploadImage } from '@/hooks/profile/useProfileUploadImage';

interface MyProfileProps {
  newProfileImg: string | File | null;
  setNewProfileImg: (value: string | File | null) => void;
}

const MyProfile: React.FC<MyProfileProps> = ({ newProfileImg, setNewProfileImg }) => {
  const { user, handleImageChange } = useProfileUploadImage(newProfileImg ?? '', setNewProfileImg);

  // 프로필 이미지 소스 계산
  const profileImgSrc = useMemo(() => {
    if (typeof newProfileImg === 'string') {
      return newProfileImg;
    }
    return user?.profile_img || ''; // 빈 문자열 반환
  }, [newProfileImg, user?.profile_img]);

  return (
    <div className="text-center">
      {/* 프로필 이미지 업로드 */}
      <label htmlFor="imgFile" className="relative group cursor-pointer block w-[138px] h-[138px] mx-auto">
        <img src={profileImgSrc} alt="프로필 사진" className="w-full h-full object-cover rounded-full" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
          <span className="text-white text-4xl font-bold">+</span>
        </div>
      </label>

      {/* 파일 선택 인풋 */}
      <input
        id="imgFile"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const files = e.target.files;
          if (files) {
            handleImageChange(files); // `null`이 아닌 경우에만 호출
          }
        }}
      />

      {/* 닉네임 표시 */}
      <h1 className="mt-[20px] text-white font-medium text-[20px]">{user?.nickname || '익명 사용자'}</h1>
    </div>
  );
};

export default MyProfile;
