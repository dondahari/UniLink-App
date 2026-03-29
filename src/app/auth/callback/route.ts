import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase-server';


// * Auth Callback Handler
 
 //Flow:
    //Email link clicked
    //→ Supabase redirects to /auth/callback?code=xxxx
    // → We exchange the code for a session (sets cookies)
    // → Redirect to /dashboard (or /login on failure)
 
export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');

    // `next` lets us send the user somewhere specific after confirmation.
    // /dashboard is default if other path not provided.
    const next = searchParams.get('next') ?? '/dashboard';

    if (code) {
        const supabase = await createSupabaseServerClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            // Session is now set via cookies
            return NextResponse.redirect(`${origin}${next}`);
        }

        console.error('[auth/callback] Code exchange failed:', error.message);
    }

    // Send the user to login with an error message.
    return NextResponse.redirect(
        `${origin}/login?error=${encodeURIComponent('Email confirmation failed. Please try again.')}`
    );
}
