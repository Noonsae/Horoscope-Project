'use client';
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';

type ReactDayPickerProps = {
  onDateSelect: (date: Date | undefined) => void;
};

const ReactDayPicker: React.FC<ReactDayPickerProps> = ({ onDateSelect }) => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [inputValue, setInputValue] = useState<string>('');

  const handleDaySelect = (day: Date | undefined) => {
    setSelectedDay(day);
    onDateSelect(day); // 부모 컴포넌트에 선택된 날짜 전달
    if (day) {
      setInputValue(format(day, 'yyyy-MM-dd')); // 입력값 업데이트
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value;
    setInputValue(inputDate);

    const parsedDate = new Date(inputDate);
    if (!isNaN(parsedDate.getTime())) {
      setSelectedDay(parsedDate);
      onDateSelect(parsedDate); // 입력된 날짜도 부모 컴포넌트에 전달
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
      <DayPicker
        mode="single"
        selected={selectedDay}
        onSelect={handleDaySelect}
        locale={ko}
        className="mt-2"
        formatters={{
          formatMonthCaption: (date, options) => format(date, 'yyyy년 MM월', { locale: options?.locale }),
          formatWeekdayName: (weekday, options) => format(weekday, 'E', { locale: options?.locale })
        }}
      />
    </div>
  );
};

export default ReactDayPicker;
