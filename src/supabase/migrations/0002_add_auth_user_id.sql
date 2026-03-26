-- Migration 0002: Link Supabase Auth users to application tables
-- Adds auth_user_id columns and rewrites RLS policies to work with auth.uid()

-- Add auth_user_id to person (used by student accounts)
ALTER TABLE public.person
    ADD COLUMN IF NOT EXISTS auth_user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add auth_user_id to employer (employer accounts link directly here, not through person)
ALTER TABLE public.employer
    ADD COLUMN IF NOT EXISTS auth_user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE;

-- Enable RLS on person table
ALTER TABLE public.person ENABLE ROW LEVEL SECURITY;

-- person policies
CREATE POLICY "Users can insert their own person record"
    ON public.person FOR INSERT
    WITH CHECK (auth_user_id = auth.uid());

CREATE POLICY "Users can view their own person record"
    ON public.person FOR SELECT
    USING (auth_user_id = auth.uid());

CREATE POLICY "Users can update their own person record"
    ON public.person FOR UPDATE
    USING (auth_user_id = auth.uid());

-- employer self-access policies
CREATE POLICY "Employers can insert their own employer record"
    ON public.employer FOR INSERT
    WITH CHECK (auth_user_id = auth.uid());

CREATE POLICY "Employers can view their own employer record"
    ON public.employer FOR SELECT
    USING (auth_user_id = auth.uid());

CREATE POLICY "Employers can update their own employer record"
    ON public.employer FOR UPDATE
    USING (auth_user_id = auth.uid());

-- ─── Drop old RLS policies (they assumed student_id/employer_id = auth.uid()) ────

DROP POLICY IF EXISTS "Students can view their own applications" ON public.application;
DROP POLICY IF EXISTS "Students can create applications" ON public.application;
DROP POLICY IF EXISTS "Employers can view applications for their jobs" ON public.application;
DROP POLICY IF EXISTS "Students can view their own profile" ON public.student;
DROP POLICY IF EXISTS "Students can update their own profile" ON public.student;
DROP POLICY IF EXISTS "Employers can view their job postings" ON public.job_posting;
DROP POLICY IF EXISTS "Employers can create job postings" ON public.job_posting;
DROP POLICY IF EXISTS "Employers can update their job postings" ON public.job_posting;
DROP POLICY IF EXISTS "Employers can create evaluations" ON public.evaluation;
DROP POLICY IF EXISTS "Students can view evaluations" ON public.evaluation;

-- ─── Helper functions (SECURITY DEFINER so they can join through person) ─────────

CREATE OR REPLACE FUNCTION public.get_student_id()
RETURNS UUID AS $$
    SELECT s.student_id
    FROM public.student s
    JOIN public.person p ON s.person_id = p.person_id
    WHERE p.auth_user_id = auth.uid()
    LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.get_employer_id()
RETURNS UUID AS $$
    SELECT employer_id
    FROM public.employer
    WHERE auth_user_id = auth.uid()
    LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- ─── Rewritten RLS policies ───────────────────────────────────────────────────────

-- student
CREATE POLICY "Students can view their own profile"
    ON public.student FOR SELECT
    USING (person_id IN (SELECT person_id FROM public.person WHERE auth_user_id = auth.uid()));

CREATE POLICY "Students can update their own profile"
    ON public.student FOR UPDATE
    USING (person_id IN (SELECT person_id FROM public.person WHERE auth_user_id = auth.uid()));

CREATE POLICY "Students can insert their own profile"
    ON public.student FOR INSERT
    WITH CHECK (person_id IN (SELECT person_id FROM public.person WHERE auth_user_id = auth.uid()));

-- application
CREATE POLICY "Students can view their own applications"
    ON public.application FOR SELECT
    USING (student_id = public.get_student_id());

CREATE POLICY "Students can create applications"
    ON public.application FOR INSERT
    WITH CHECK (student_id = public.get_student_id());

CREATE POLICY "Employers can view applications for their jobs"
    ON public.application FOR SELECT
    USING (job_id IN (SELECT job_id FROM public.job_posting WHERE employer_id = public.get_employer_id()));

-- job_posting
CREATE POLICY "Employers can view their job postings"
    ON public.job_posting FOR SELECT
    USING (employer_id = public.get_employer_id());

CREATE POLICY "Employers can create job postings"
    ON public.job_posting FOR INSERT
    WITH CHECK (employer_id = public.get_employer_id());

CREATE POLICY "Employers can update their job postings"
    ON public.job_posting FOR UPDATE
    USING (employer_id = public.get_employer_id());

-- evaluation
CREATE POLICY "Employers can create evaluations"
    ON public.evaluation FOR INSERT
    WITH CHECK (employer_id = public.get_employer_id());

CREATE POLICY "Students can view evaluations"
    ON public.evaluation FOR SELECT
    USING (student_id = public.get_student_id());
