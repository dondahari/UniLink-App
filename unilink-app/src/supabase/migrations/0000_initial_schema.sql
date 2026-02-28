-- Migration for Campus Connect DB
-- Converted from queries.sql for Supabase Postgres

CREATE TABLE IF NOT EXISTS public.person (
    person_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(100) NOT NULL,
    email_addr VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(15),
    join_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.student (
    student_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    person_id UUID NOT NULL REFERENCES public.person(person_id) ON DELETE CASCADE,
    major VARCHAR(50),
    gpa DECIMAL(3,2) CHECK (gpa >= 0.0 AND gpa <= 4.0),
    grad_year INT,
    skills TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.employer (
    employer_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    co_name VARCHAR(100) NOT NULL,
    industry VARCHAR(50),
    location VARCHAR(100),
    website VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.category (
    cat_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cat_name VARCHAR(50) NOT NULL,
    cat_desc TEXT,
    dept_code VARCHAR(10),
    active_stat BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.job_posting (
    job_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employer_id UUID NOT NULL REFERENCES public.employer(employer_id) ON DELETE CASCADE,
    cat_id UUID NOT NULL REFERENCES public.category(cat_id) ON DELETE RESTRICT,
    job_title VARCHAR(100) NOT NULL,
    rate DECIMAL(8,2) CHECK (rate > 0),
    posted DATE DEFAULT CURRENT_DATE,
    exp_lvl VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.application (
    app_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.student(student_id) ON DELETE CASCADE,
    job_id UUID NOT NULL REFERENCES public.job_posting(job_id) ON DELETE CASCADE,
    app_date DATE DEFAULT CURRENT_DATE,
    status VARCHAR(20) DEFAULT 'Pending',
    resume_url VARCHAR(255),
    cover_letter TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.evaluation (
    eval_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.student(student_id) ON DELETE CASCADE,
    employer_id UUID NOT NULL REFERENCES public.employer(employer_id) ON DELETE CASCADE,
    perf_score INT CHECK (perf_score BETWEEN 1 AND 5),
    manager_comments TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Note: We use UUIDs rather than integer auto_incrementing IDs 
-- because it works better with Supabase Auth and RLS.
