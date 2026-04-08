-- Migration 0005: Add Employer Logo functionality and map Storage Bucket natively

-- 1. Append logo URL property conditionally
ALTER TABLE public.employer
ADD COLUMN IF NOT EXISTS logo_url TEXT;

-- 2. Build explicit 'employer-logos' Storage Bucket for the platform natively
INSERT INTO storage.buckets (id, name, public) 
VALUES ('employer-logos', 'employer-logos', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Ensure native visibility policy across generic buckets
DROP POLICY IF EXISTS "Public can view employer logos" ON storage.objects;
CREATE POLICY "Public can view employer logos"
ON storage.objects FOR SELECT
USING (bucket_id = 'employer-logos');

-- 4. Enable Employer authenticated mappings to Upload safely via RLS
DROP POLICY IF EXISTS "Authenticated users can upload employer logos" ON storage.objects;
CREATE POLICY "Authenticated users can upload employer logos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'employer-logos');

-- 5. Enable Employer mapped users to update specific avatar assets
DROP POLICY IF EXISTS "Authenticated users can update employer logos" ON storage.objects;
CREATE POLICY "Authenticated users can update employer logos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'employer-logos');
