-- Row Level Security Policies for UniLink
-- Designed before Supabase initialization
-- Policies assume auth.uid() will map to student_id/employer_id
-- Final adjustments may be required after Supabase auth integration

-- Enable Row Level Security on core tables

ALTER TABLE public.student ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employer ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_posting ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.category ENABLE ROW LEVEL SECURITY;

-- Students can view their own applications

CREATE POLICY "Students can view their own applications"
ON public.application
FOR SELECT
USING (
    student_id = auth.uid()
);

-- Students can create applications

CREATE POLICY "Students can create applications"
ON public.application
FOR INSERT
WITH CHECK (
    student_id = auth.uid()
);

-- Employers can view applications submitted to their jobs

CREATE POLICY "Employers can view applications for their jobs"
ON public.application
FOR SELECT
USING (
    job_id IN (
        SELECT job_id
        FROM public.job_posting
        WHERE employer_id = auth.uid()
    )
);

-- Students can view their own student record

CREATE POLICY "Students can view their own profile"
ON public.student
FOR SELECT
USING (
    student_id = auth.uid()
);

-- Students can update their own profile

CREATE POLICY "Students can update their own profile"
ON public.student
FOR UPDATE
USING (
    student_id = auth.uid()
);

-- Employers can view their own job postings

CREATE POLICY "Employers can view their job postings"
ON public.job_posting
FOR SELECT
USING (
    employer_id = auth.uid()
);

-- Employers can create job postings

CREATE POLICY "Employers can create job postings"
ON public.job_posting
FOR INSERT
WITH CHECK (
    employer_id = auth.uid()
);

-- Employers can update their own job postings

CREATE POLICY "Employers can update their job postings"
ON public.job_posting
FOR UPDATE
USING (
    employer_id = auth.uid()
);

-- Employers can create evaluations for students

CREATE POLICY "Employers can create evaluations"
ON public.evaluation
FOR INSERT
WITH CHECK (
    employer_id = auth.uid()
);

-- Students can view their evaluations

CREATE POLICY "Students can view evaluations"
ON public.evaluation
FOR SELECT
USING (
    student_id = auth.uid()
);

-- Anyone can view categories

CREATE POLICY "Anyone can view categories"
ON public.category
FOR SELECT
USING (true);