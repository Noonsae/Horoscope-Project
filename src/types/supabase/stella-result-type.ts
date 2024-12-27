import { Tables } from "./supabase-type";

export type DailyList = Tables<'daily_results'> & {
  users?: {
    nickname?: string;
    profile_img?: string | null;
  };
  daily_fortunes: {
    content: string;
  };
};

export type YearList = Tables<'new_year_results'> & {
  users: {
    nickname: string;
    profile_img: string | null;
  };
  new_year_fortunes: {
    content: string;
  };
};