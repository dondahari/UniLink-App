-- 0003_add_job_details.sql
-- Migration to inject vital categorization logic for distinct job compensation methodologies and tracking.

ALTER TABLE public.job_posting 
ADD COLUMN IF NOT EXISTS contract_time VARCHAR(100),
ADD COLUMN IF NOT EXISTS pay_type VARCHAR(20) DEFAULT 'Hourly';
