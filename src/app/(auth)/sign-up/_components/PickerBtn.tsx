import ReactDayPicker from '@/components/ui/ReactDayPicker';
import { FormData } from '@/types/auth-type/sign-up.type';
import React from 'react';

interface PickerBtnProps {
  handleDateChange: (date: Date | null) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  setShowPicker: React.Dispatch<React.SetStateAction<boolean>>;
}

const PickerBtn: React.FC<PickerBtnProps> = ({ handleDateChange, setFormData, setShowPicker }) => {
  return (
    <div className="flex flex-col gap-4 w-[400px] p-6 bg-white rounded shadow">
      {/* 생년월일 선택 컴포넌트 */}
      <ReactDayPicker onDateChange={handleDateChange} />

      {/* 완료 버튼 */}
      <button
        type="button"
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => setShowPicker(false)} // 생년월일 선택 완료 시 Picker 닫기
      >
        완료
      </button>

      {/* 초기화 및 뒤로 가기 버튼 */}
      <button
        type="button"
        className="mt-2 bg-gray-500 text-white py-2 px-4 rounded"
        onClick={() => {
          setShowPicker(false); // Picker 숨기기
          setFormData((prev) => ({
            ...prev,
            birth_date: '' // 생년월일 초기화
          }));
        }}
      >
        뒤로 가기
      </button>
    </div>
  );
};

export default PickerBtn;
