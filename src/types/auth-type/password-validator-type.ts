export interface ValidatorParams {
  name: string;
  value: string;
  mode?: 'signup' | 'login'; // mode는 선택적으로 추가
  password?: string; // 비밀번호와 비교 검사를 위해 추가
}
