import ReactDayPicker from '@/components/ui/ReactDayPicker';
import { FormData } from '@/types/sign-up.type';
// import { FormData } from '@/types/sign-up.type';
import React from 'react';

interface PickerBtnProps {
  handleDateChange: (selectedDate: Date | null) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const PickerBtn: React.FC<PickerBtnProps> = ({ handleDateChange, handleSubmit, setFormData }) => {
  return (
    <div>
      <form className="flex flex-col gap-4 w-1 bg-white w-[400px] p-6 rounded shadow" onSubmit={handleSubmit}>
        <ReactDayPicker onDateChange={handleDateChange} />
        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
          회원가입 하기
        </button>
        <button
          type="button"
          className="mt-2 bg-gray-500 text-white py-2 px-4 rounded"
          onClick={() =>
            setFormData({
              email: '',
              nickname: '',
              password: '',
              confirmPassword: '',
              birth_date: null
            })
          }
        >
          뒤로 가기
        </button>
      </form>
    </div>
  );
};

export default PickerBtn;
