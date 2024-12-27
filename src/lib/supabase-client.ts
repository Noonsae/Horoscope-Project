<<<<<<< HEAD
=======
// @lib/supabase-client.ts

>>>>>>> f00abaae8af916b7812e6a7bee4e433620e5cf47
import { Database } from '@/types/supabase-type';
import { createBrowserClient } from '@supabase/ssr';

export const browserSupabase = () => {
<<<<<<< HEAD
=======

>>>>>>> f00abaae8af916b7812e6a7bee4e433620e5cf47
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};
