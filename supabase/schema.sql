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

-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Companies policies
create policy "Companies are viewable by everyone"
  on public.companies for select
  using (true);

create policy "Users can insert their own company"
  on public.companies for insert
  with check (auth.uid() = id);

create policy "Users can update their own company"
  on public.companies for update
  using (auth.uid() = id);

-- Shortlists policies
create policy "Users can view their own shortlists"
  on public.shortlists for select
  using (auth.uid() = recruiter_id);

create policy "Users can insert their own shortlists"
  on public.shortlists for insert
  with check (auth.uid() = recruiter_id);

create policy "Users can delete their own shortlists"
  on public.shortlists for delete
  using (auth.uid() = recruiter_id);

-- Create function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data->>'full_name', 'talent');
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user(); 