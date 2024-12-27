import { Tables } from "./supabase-type";

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

export type DailyList = Tables<'daily_results'> & {
  users: {
    nickname: string;
    profile_img: string | null;
  },
  daily_fortunes: {
    content: string;
  }
}

export type YearList = Tables<'new_year_results'> & {
  users: {
    nickname: string;
    profile_img: string | null;
  },
  new_year_fortunes: {
    content: string;
  }
}