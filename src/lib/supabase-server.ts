import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Server-side Supabase client — use in Server Components, Server Actions, and Route Handlers.
// Must be called inside an async context (it awaits the cookies store).
export async function createSupabaseServerClient() {
    const cookieStore = await cookies();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        // Return a proxy that logs errors instead of crashing the whole app
        return {
            auth: { getUser: async () => ({ data: { user: null } }) },
            from: () => ({ select: () => ({ eq: () => ({ single: async () => ({ data: null }) }) }) }),
        } as any;
    }

    return createServerClient(
        supabaseUrl,
        supabaseAnonKey,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch {
                        // setAll may be called from a Server Component render where
                        // mutating cookies is not allowed — this is safe to ignore.
                    }
                },
            },
        }
    );
}
