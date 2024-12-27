<<<<<<< HEAD
'use server'
import { Database } from '@/types/supabase-type';
=======
'use server';

// @lib/supabase-server.ts

import { Database } from '@/types/supabase-type';

>>>>>>> f00abaae8af916b7812e6a7bee4e433620e5cf47
import { createServerClient } from '@supabase/ssr';

import { cookies } from 'next/headers';



export const serverSupabase = () => {
  const cookieStore = cookies();
<<<<<<< HEAD

=======
  
>>>>>>> f00abaae8af916b7812e6a7bee4e433620e5cf47
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        }
      }
    }
  );
};
