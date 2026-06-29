-- Supabase waitlist table setup
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  country TEXT DEFAULT 'NG',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts only (for waitlist signup)
CREATE POLICY "Allow anonymous insert" ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Index for faster email lookups
CREATE INDEX IF NOT EXISTS waitlist_email_idx ON waitlist (email);
