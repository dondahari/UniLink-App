'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase-server';

export async function login(formData: FormData) {
    const supabase = await createSupabaseServerClient();

    const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    });

    if (error) {
        redirect('/login?error=' + encodeURIComponent(error.message));
    }

    const role = authData?.user?.user_metadata?.role || 'student';

    revalidatePath('/', 'layout');
    
    if (role === 'employer') {
        redirect('/employer');
    } else {
        redirect('/dashboard');
    }
}

export async function register(formData: FormData) {
    const supabase = await createSupabaseServerClient();

    const firstName = (formData.get('firstName') as string).trim();
    const lastName  = (formData.get('lastName')  as string).trim();
    const email     = (formData.get('email')     as string).trim();
    const password  =  formData.get('password')  as string;
    const role      = (formData.get('role')      as string) === 'employer' ? 'employer' : 'student';
    const fullName  = `${firstName} ${lastName}`;

    // Create the Supabase Auth user.
    // A database trigger (0003_user_trigger.sql) automatically creates the
    // person + student/employer records, so no manual inserts are needed here.
    const siteUrl = process.env.SITE_URL ?? 'http://localhost:3000';

    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { full_name: fullName, role },
            emailRedirectTo: `${siteUrl}/auth/callback`,
        },
    });

    if (authError) {
        redirect('/register?error=' + encodeURIComponent(authError.message));
    }

    if (!authData.user) {
        redirect('/register?error=' + encodeURIComponent('Registration failed. Please try again.'));
    }

    // No session means Supabase sent a confirmation email — tell the user to check it.
    if (!authData.session) {
        redirect('/verify-email');
    }

    revalidatePath('/', 'layout');
    
    if (role === 'employer') {
        redirect('/employer');
    } else {
        redirect('/dashboard');
    }
}

export async function logout() {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
    revalidatePath('/', 'layout');
    redirect('/');
}

export async function requestPasswordReset(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const email = (formData.get('email') as string).trim();
  const siteUrl = process.env.SITE_URL ?? 'http://localhost:3000';

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/auth/callback?next=/reset-password`,
  });

  if (error) {
    redirect('/forgot-password?error=' + encodeURIComponent(error.message));
  }

  // Always redirect to a "check your email" screen doesn't reveal whether
  // the address exists in the system
  redirect('/forgot-password?sent=true');
}

export async function updatePassword(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    redirect('/reset-password?error=' + encodeURIComponent(error.message));
  }

  redirect('/login?message=' + encodeURIComponent('Password updated. Please sign in.'));
}
