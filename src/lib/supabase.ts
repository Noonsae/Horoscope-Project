// supabase server & browser 통합 로직

import { browserSupabase } from './supabase-client';
import { serverSupabase } from './supabase-server';

export const supabase = typeof window === undefined ? serverSupabase() : browserSupabase();