import React, { useState } from 'react';
import PasswordValidator from '@/utils/Passwordvalidator';
import { LOGIN_FIELDS, SIGNUP_FIELDS } from '@/constants/input_fields';

interface AuthFormProps {
  mode: 'signup' | 'login';
  onSubmit: (formData: {    
    email: string;
    nickname: string;
    password: string;
    checkPassword: string;
    birth_date: string;
  }) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit }) => {
  const [formData, setFormData] = useState({
    email : '',
    nickname: '',    
    password: '',
    checkPassword: '',
    birth_date: '',
  });

  // 에러 상태
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 모드에 따라 적절한 입력 필드 선택
  const inputFields = mode === 'signup' ? SIGNUP_FIELDS : LOGIN_FIELDS;

  // 폼 데이터 유효성 검사
  const validateForm = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    // keyof formData로 key 타입을 제한
    (Object.keys(formData) as (keyof typeof formData)[]).forEach((key) => {
      const error = PasswordValidator(key, formData[key]);
      if (typeof error === 'string' && error) {
        newErrors[key] = error;
      }
    });

    return newErrors;
  };

  // 입력 값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert('입력한 정보에 오류가 있습니다. 다시 확인해주세요.');
      return;
    }

    try {
      await onSubmit(formData);
      alert(mode === 'signup' ? '회원가입 성공!' : '로그인 성공!');
    } catch (error: any) {
      alert('오류 발생: ' + error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full my-8 p-8 flex flex-col justify-evenly bg-gray-100 shadow-md rounded-lg text-center"
    >
      {inputFields.map((field) => (
        <fieldset key={field.name} className="mb-6">
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name as keyof typeof formData] || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            autoComplete={field.autoComplete || 'off'}
            required
            className="w-full mb-1 p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors[field.name] && <p className="text-sm text-red-500 mt-1">{errors[field.name]}</p>}
        </fieldset>
      ))}
      <button
        type="submit"
        className="w-full py-3 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition"
      >
        {mode === 'signup' ? '회원가입' : '로그인'}
      </button>
    </form>
  );
};

export default AuthForm;
