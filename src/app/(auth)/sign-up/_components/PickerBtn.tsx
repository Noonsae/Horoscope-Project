import ReactDayPicker from '@/components/ui/ReactDayPicker';
import { FormData } from '@/types/auth-type/sign-up.type';
import React from 'react';

interface PickerBtnProps {
  handleDateChange: (selectedDate: Date | null) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  setShowPicker: React.Dispatch<React.SetStateAction<boolean>>; // 추가된 props
}

const PickerBtn: React.FC<PickerBtnProps> = ({ handleDateChange, handleSubmit, setFormData, setShowPicker }) => {
  return (
    <div>
      <form
        className="flex flex-col gap-4 w-1 bg-white w-[400px] p-6 rounded shadow"
        onSubmit={(e) => {
          e.preventDefault(); // 기본 동작 방지
          handleSubmit(e); // 부모의 handleSubmit 호출
        }}
      >
        {/* 생년월일 선택 컴포넌트 */}
        <ReactDayPicker onDateChange={handleDateChange} />

        {/* 회원가입 완료 버튼 */}
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
          회원가입 하기
        </button>

        {/* 뒤로 가기 버튼 */}
        <button
          type="button"
          className="mt-2 bg-gray-500 text-white py-2 px-4 rounded"
          onClick={() => {
            setShowPicker(false); // Picker 숨기기
            setFormData((prev) => ({
              ...prev,
              birth_date: '' // `birth_date` 초기화
            }));
          }}
        >
          뒤로 가기
        </button>
      </form>
    </div>
  );
};

export default PickerBtn;
