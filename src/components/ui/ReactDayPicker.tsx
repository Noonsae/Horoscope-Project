'use client';
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { ko } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';

interface ReactDayPickerProps {
  onDateChange: (date: Date | null) => void; // 날짜 변경 시 부모에게 전달하는 콜백
}

const ReactDayPicker: React.FC<ReactDayPickerProps> = ({ onDateChange }) => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());
  const [inputValue, setInputValue] = useState<string>(selectedDay ? format(selectedDay, 'yyyy-MM-dd') : '');

  const handleDaySelect = (day: Date | undefined) => {
    setSelectedDay(day);
    onDateChange(day || null); // 부모 컴포넌트에 변경된 날짜 전달
    if (day) {
      setInputValue(format(day, 'yyyy-MM-dd'));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value;
    setInputValue(inputDate);

    const parsedDate = new Date(inputDate);
    if (!isNaN(parsedDate.getTime())) {
      setSelectedDay(parsedDate);
      onDateChange(parsedDate); // 부모 컴포넌트에 입력된 날짜 전달
    } else {
      onDateChange(null); // 유효하지 않은 날짜일 경우 null 전달
    }
  };

  return (
    <div className="mb-4 w-full">
      <input
        type="date"
        value={inputValue}
        onChange={handleInputChange}
        className="border border-gray-300 rounded px-4 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <DayPicker mode="single" selected={selectedDay} onSelect={handleDaySelect} locale={ko} className="mt-2" />
    </div>
  );
};

export default ReactDayPicker;
