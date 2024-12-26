export interface DailyResult {
  id: number;
  created_at: string;
  daily_fortune_id: string;
  user_id: string;
}

export interface NewYearResult {
  id: string;
  created_at: string;
  new_year_fortune_id: string;
  user_id: string;
}
