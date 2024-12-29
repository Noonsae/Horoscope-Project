import { Tables } from './supabase-type';

export type stellas = Tables<'stellas'> & {
  users: {
    id: string;
    name: String;
    description: String;
    img_url: string;
    button_img: string;
  };
};
