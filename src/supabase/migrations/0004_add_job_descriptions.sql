-- Migration 0004: Add Job Description functionality
-- Injects the job_desc property allowing deep markdown mapping natively for employer forms

ALTER TABLE public.job_posting
ADD COLUMN IF NOT EXISTS job_desc TEXT;
