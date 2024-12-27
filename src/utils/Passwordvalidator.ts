const PasswordValidator = (name: string, value: string): string => {
  let error = '';
  if (name === 'nickname' && !value) {
    error = '별명을 입력해주세요.';
  } else if (name === 'id' && !value) {
    error = '아이디를 입력해주세요.';
  } else if (name === 'password' && value.length < 6) {
    error = '비밀번호는 최소 6자 이상이어야 합니다.';
  } else if (name === 'checkPassword' && value !== formData.password) {
    error = '입력하신 비밀번호와 일치하지 않습니다.';
  }
  return error;
};

export default PasswordValidator;
