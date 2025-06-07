-- Talent Profiles
CREATE TABLE public.talent_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),

  -- Core Identity
  name TEXT,
  username TEXT UNIQUE,
  avatar_url TEXT,             -- profile picture
  headline TEXT,               -- short title like “AI Engineer & Indie Hacker”
  bio TEXT,                    -- longer paragraph

  -- Contact & Socials
  location TEXT,
  website TEXT,
  email TEXT,
  twitter TEXT,
  github TEXT,
  linkedin TEXT,
  youtube TEXT,
  loom TEXT,

  -- Professional Details
  primary_role TEXT,
  current_company TEXT,
  industry TEXT,
  employment_type TEXT,        -- e.g., "full-time", "freelance", "open to both"
  is_open_to_opportunities BOOLEAN DEFAULT FALSE,

  -- Skills & Tags
  skills TEXT[],               -- free-form or tag-based
  tools TEXT[],                -- e.g., "GPT-4", "Zapier", "TypeScript"
  specialties TEXT[],          -- e.g., "growth hacking", "LLM chaining"

  -- Stats & Signal
  years_of_experience INT,
  portfolio_url TEXT,
  resume_url TEXT,

  -- Visibility
  is_visible BOOLEAN DEFAULT TRUE
);

-- Hire Profiles
CREATE TABLE public.hire_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),

  -- Identity
  name TEXT,                       -- John Smith or Acme Inc
  avatar_url TEXT,                 -- logo or person
  headline TEXT,                   -- e.g., “Hiring for AI Startup” or “Recruiter at OpenAI”
  bio TEXT,                        -- optional longer description

  -- Contact & Social
  email TEXT,
  website TEXT,
  linkedin TEXT,
  twitter TEXT,

  -- Hiring Intent
  company_name TEXT,
  company_size TEXT,               -- e.g., "1–10", "11–50", "Enterprise"
  role_title TEXT,                 -- What they’re hiring for (e.g., “AI engineer”)
  job_type TEXT,                   -- e.g., "full-time", "freelance", "contract"
  job_location TEXT,               -- e.g., "Remote", "SF Bay Area"
  is_hiring BOOLEAN DEFAULT FALSE,

  -- Shortlist Behavior
  can_shortlist BOOLEAN DEFAULT TRUE,
  notes TEXT                       -- internal notes, optional
);

-- Team Members for Hire Profiles
CREATE TABLE public.hire_profile_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hire_profile_id UUID REFERENCES hire_profiles(user_id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('owner', 'editor', 'viewer')) DEFAULT 'editor',
  invited_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  accepted BOOLEAN DEFAULT FALSE
);

-- Shortlists
CREATE TABLE public.shortlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hire_profile_id UUID REFERENCES hire_profiles(user_id) ON DELETE CASCADE,
  talent_profile_id UUID REFERENCES talent_profiles(user_id) ON DELETE CASCADE,
  tags TEXT[], -- Array of tag labels
  rating INTEGER CHECK (rating >= 1 AND rating <= 5), -- 1 to 5 star rating
  notes TEXT, -- Optional notes from the hiring team
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Shortlist Activity Log
CREATE TABLE public.shortlist_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shortlist_id UUID REFERENCES shortlists(id) ON DELETE CASCADE,
  actor_id UUID REFERENCES auth.users(id),
  action_type TEXT CHECK (action_type IN (
    'added', 'removed', 'updated_rating', 'added_tag', 'removed_tag', 'added_note'
  )),
  action_detail TEXT, -- Optional: e.g., "Set rating to 4", "Added tag: frontend"
  created_at TIMESTAMP DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.talent_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hire_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hire_profile_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shortlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shortlist_activity ENABLE ROW LEVEL SECURITY;
