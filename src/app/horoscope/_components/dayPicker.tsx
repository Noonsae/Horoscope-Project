'use client';
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { ko } from 'date-fns/locale';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';

const ReactDayPicker: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());
  const [inputValue, setInputValue] = useState<string>(selectedDay ? format(selectedDay, 'yyyy-MM-dd') : '');

  const handleDaySelect = (day: Date | undefined) => {
    setSelectedDay(day);
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