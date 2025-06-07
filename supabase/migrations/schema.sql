create table public.talent_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now(),

  -- Core Identity
  name text,
  username text unique,
  avatar_url text,             -- profile picture
  headline text,               -- short title like “AI Engineer & Indie Hacker”
  bio text,                    -- longer paragraph

  -- Contact & Socials
  location text,
  website text,
  email text,
  twitter text,
  github text,
  linkedin text,
  youtube text,
  loom text,

  -- Professional Details
  primary_role text,
  current_company text,
  industry text,
  employment_type text,        -- e.g., "full-time", "freelance", "open to both"
  is_open_to_opportunities boolean default false,

  -- Skills & Tags
  skills text[],               -- free-form or tag-based
  tools text[],                -- e.g., "GPT-4", "Zapier", "TypeScript"
  specialties text[],          -- e.g., "growth hacking", "LLM chaining"
  
  -- Stats & Signal
  years_of_experience int,
  portfolio_url text,
  resume_url text,

  -- Visibility
  is_visible boolean default true
);

create table hire_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now(),

  -- Identity
  name text,                       -- John Smith or Acme Inc
  avatar_url text,                 -- logo or person
  headline text,                   -- e.g., “Hiring for AI Startup” or “Recruiter at OpenAI”
  bio text,                        -- optional longer description

  -- Contact & Social
  email text,
  website text,
  linkedin text,
  twitter text,

  -- Hiring Intent
  company_name text,
  company_size text,               -- e.g., "1–10", "11–50", "Enterprise"
  role_title text,                 -- What they’re hiring for (e.g., “AI engineer”)
  job_type text,                   -- e.g., "full-time", "freelance", "contract"
  job_location text,               -- e.g., "Remote", "SF Bay Area"
  is_hiring boolean default false,

  -- Shortlist Behavior
  can_shortlist boolean default true,
  notes text                       -- internal notes, optional
);

create table hire_profile_members (
  id uuid primary key default gen_random_uuid(),
  hire_profile_id uuid references hire_profiles(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  role text check (role in ('owner', 'editor', 'viewer')) default 'editor',
  invited_at timestamp with time zone default now(),
  accepted boolean default false
);


CREATE TABLE shortlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hire_profile_id UUID REFERENCES hire_profiles(id) ON DELETE CASCADE,
  talent_profile_id UUID REFERENCES talent_profiles(id) ON DELETE CASCADE,
  tags TEXT[], -- Array of tag labels
  rating INTEGER CHECK (rating >= 1 AND rating <= 5), -- 1 to 5 star rating
  notes TEXT, -- Optional notes from the hiring team
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE shortlist_activity (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shortlist_id UUID REFERENCES shortlists(id) ON DELETE CASCADE,
  actor_id UUID REFERENCES users(id), -- Who made the action
  action_type TEXT CHECK (action_type IN (
    'added', 'removed', 'updated_rating', 'added_tag', 'removed_tag', 'added_note'
  )),
  action_detail TEXT, -- Optional: e.g., "Set rating to 4", "Added tag: frontend"
  created_at TIMESTAMP DEFAULT NOW()
);


-- Enable RLS on all tables
ALTER TABLE talent_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE hire_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE shortlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE shortlist_activity ENABLE ROW LEVEL SECURITY;