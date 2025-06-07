-- === Enable RLS on all relevant tables ===
ALTER TABLE public.talent_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hire_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hire_profile_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shortlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shortlist_activity ENABLE ROW LEVEL SECURITY;

-- === Role-checking helper functions ===

-- Check if user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.hire_profiles
    WHERE user_id = auth.uid()
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if user is part of a hire profile team
CREATE OR REPLACE FUNCTION public.is_hire()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.hire_profile_members
    WHERE user_id = auth.uid()
    AND accepted = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Check if user has a talent profile
CREATE OR REPLACE FUNCTION public.is_talent()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.talent_profiles
    WHERE user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- === RLS Policies for talent_profiles ===

CREATE POLICY "Public can read visible talent profiles"
ON public.talent_profiles FOR SELECT
USING (is_visible = true OR is_admin());

CREATE POLICY "User can insert own talent profile"
ON public.talent_profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "User can update own talent profile"
ON public.talent_profiles FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "User can delete own talent profile"
ON public.talent_profiles FOR DELETE
USING (auth.uid() = user_id);

-- === RLS Policies for hire_profiles ===

CREATE POLICY "Public can read visible hire profiles"
ON public.hire_profiles FOR SELECT
USING (is_hire() OR is_admin());

CREATE POLICY "User can insert own hire profile"
ON public.hire_profiles FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "User can update own hire profile"
ON public.hire_profiles FOR UPDATE
USING (
  user_id IN (
    SELECT hire_profile_id FROM public.hire_profile_members
    WHERE user_id = auth.uid()
    AND role IN ('owner', 'editor')
    AND accepted = true
  )
);

CREATE POLICY "User can delete own hire profile"
ON public.hire_profiles FOR DELETE
USING (
  user_id IN (
    SELECT hire_profile_id FROM public.hire_profile_members
    WHERE user_id = auth.uid()
    AND role = 'owner'
    AND accepted = true
  )
);

-- === RLS Policies for hire_profile_members ===

CREATE POLICY "Members can view their memberships"
ON public.hire_profile_members FOR SELECT
USING (user_id = auth.uid() OR is_admin());

CREATE POLICY "Members can insert themselves"
ON public.hire_profile_members FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Members can update their own status"
ON public.hire_profile_members FOR UPDATE
USING (user_id = auth.uid());

-- === RLS Policies for shortlists ===

CREATE POLICY "Hire team members can view shortlists"
ON public.shortlists FOR SELECT
USING (
  hire_profile_id IN (
    SELECT hire_profile_id FROM public.hire_profile_members
    WHERE user_id = auth.uid()
    AND accepted = true
  )
  OR is_admin()
);

CREATE POLICY "Hire team members can insert shortlists"
ON public.shortlists FOR INSERT
WITH CHECK (
  hire_profile_id IN (
    SELECT hire_profile_id FROM public.hire_profile_members
    WHERE user_id = auth.uid()
    AND role IN ('owner', 'editor')
    AND accepted = true
  )
);

CREATE POLICY "Hire team members can delete shortlists"
ON public.shortlists FOR DELETE
USING (
  hire_profile_id IN (
    SELECT hire_profile_id FROM public.hire_profile_members
    WHERE user_id = auth.uid()
    AND role IN ('owner', 'editor')
    AND accepted = true
  )
);

-- === RLS Policies for shortlist_activity ===

CREATE POLICY "Activity visible to team members"
ON public.shortlist_activity FOR SELECT
USING (
  shortlist_id IN (
    SELECT id FROM public.shortlists
    WHERE hire_profile_id IN (
      SELECT hire_profile_id FROM public.hire_profile_members
      WHERE user_id = auth.uid()
      AND accepted = true
    )
  )
  OR is_admin()
);

CREATE POLICY "Team members can insert activity logs"
ON public.shortlist_activity FOR INSERT
WITH CHECK (
  shortlist_id IN (
    SELECT id FROM public.shortlists
    WHERE hire_profile_id IN (
      SELECT hire_profile_id FROM public.hire_profile_members
      WHERE user_id = auth.uid()
      AND accepted = true
    )
  )
);
