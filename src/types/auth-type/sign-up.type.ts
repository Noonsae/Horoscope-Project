export interface FormData {
  email: string;
  nickname: string;
  password: string;
  checkPassword: string;
  birth_date: string | null;
}

export interface SignUpPayload {
  email: string;
  password: string;
  nickname: string;
  birth_date: string;
}
