type InputField = {
  name: string;
  type: string;
  placeholder: string;
  autoComplete?: string;
};

export const SIGNUP_FIELDS: InputField[] = [
  {
    name: 'nickname',
    type: 'text',
    placeholder: '별명을 입력해주세요.'
  },
  {
    name: 'id',
    type: 'e-mail',
    placeholder: '아이디를 입력해주세요.',
    autoComplete: 'current-id'
  },
  {
    name: 'password',
    type: 'password',
    placeholder: '비밀번호를 입력해주세요.',
    autoComplete: 'current-password'
  },
  {
    name: 'checkPassword',
    type: 'password',
    placeholder: '비밀번호를 한번 더 입력해주세요.'
  }
];

export const LOGIN_FIELDS: InputField[] = [
  {
    name: 'id',
    type: 'e-mail',
    placeholder: '아이디를 입력해주세요.',
    autoComplete: 'current-id'
  },
  {
    name: 'password',
    type: 'password',
    placeholder: '비밀번호를 입력해주세요.',
    autoComplete: 'current-password'
  }
];