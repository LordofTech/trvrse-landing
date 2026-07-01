-- Supabase waitlist table setup
-- Run this in Supabase SQL Editor (Dashboard → SQL → New query → Run)

CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  country TEXT DEFAULT 'NG',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Reset policies so signups work reliably
DROP POLICY IF EXISTS "Allow anonymous insert" ON public.waitlist;

CREATE POLICY "Allow anonymous insert"
  ON public.waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Required for anon/API inserts
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON public.waitlist TO anon;

CREATE INDEX IF NOT EXISTS waitlist_email_idx ON public.waitlist (email);

-- View all signups (run anytime in SQL Editor)
-- SELECT email, country, created_at FROM public.waitlist ORDER BY created_at DESC;
