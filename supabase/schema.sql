-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null,
  bio text,
  skills text[] default '{}',
  tools text[] default '{}',
  projects jsonb default '[]',
  avatar_url text,
  role text default 'talent' check (role in ('talent', 'recruiter', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create companies table
create table public.companies (
  id uuid references auth.users on delete cascade primary key,
  company_name text not null,
  description text,
  website text,
  subscription_status text default 'free' check (subscription_status in ('free', 'premium')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create shortlists table
create table public.shortlists (
  id uuid default gen_random_uuid() primary key,
  recruiter_id uuid references auth.users on delete cascade not null,
  player_id uuid references public.profiles on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(recruiter_id, player_id)
);

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.companies enable row level security;
alter table public.shortlists enable row level security; 