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
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type'); // 'recovery' for password reset
  const next = searchParams.get('next') ?? '/dashboard';

  const supabase = await createSupabaseServerClient();

  if (token_hash && type) {
    // Password reset (and email change) flow
    const { error } = await supabase.auth.verifyOtp({ token_hash, type: type as any });
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
    console.error('[auth/callback] OTP verification failed:', error.message);
  } else if (code) {
    // Standard email confirmation flow (PKCE)
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
    console.error('[auth/callback] Code exchange failed:', error.message);
  }

  return NextResponse.redirect(
    `${origin}/login?error=${encodeURIComponent('Link is invalid or has expired.')}`
  );
}
