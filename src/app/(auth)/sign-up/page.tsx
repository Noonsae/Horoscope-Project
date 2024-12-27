'use client';

import React from 'react';
import InputGroup from './_components/InputGroup';
import PickerBtn from './_components/PickerBtn';
import useFormData from '@/hooks/signup/useFormData';



const SignUpPage: React.FC = () => {
  const { formData, handleInputChange, handleDateChange, handleSubmit, isFormComplete, setFormData } = useFormData();

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen w-full h-64 bg-gradient">
        {!isFormComplete ? (
          <InputGroup formData={formData} handleInputChange={handleInputChange} />
        ) : (
          <PickerBtn handleDateChange={handleDateChange} handleSubmit={handleSubmit} setFormData={setFormData} />
        )}
      </div>
    </>
  );
};

export default SignUpPage;
