-- Enable RLS
ALTER TABLE talent_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE hire_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE shortlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE shortlist_activity ENABLE ROW LEVEL SECURITY;

-- RLS for talent_profiles
CREATE POLICY "Anyone can read public talent profiles"
  ON talent_profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own talent profile"
  ON talent_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own talent profile"
  ON talent_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own talent profile"
  ON talent_profiles FOR DELETE
  USING (auth.uid() = user_id);

-- RLS for hire_profiles
CREATE POLICY "Anyone can view public hire profiles"
  ON hire_profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own hire profile"
  ON hire_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own hire profile"
  ON hire_profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own hire profile"
  ON hire_profiles FOR DELETE
  USING (auth.uid() = user_id);

-- RLS for shortlists
CREATE POLICY "Users can read their own shortlists"
  ON shortlists FOR SELECT
  USING (auth.uid() = hire_profile_id);

CREATE POLICY "Users can insert their own shortlists"
  ON shortlists FOR INSERT
  WITH CHECK (auth.uid() = hire_profile_id);

CREATE POLICY "Users can delete their own shortlists"
  ON shortlists FOR DELETE
  USING (auth.uid() = hire_profile_id);

-- RLS for shortlist_activity
CREATE POLICY "Users can read their own activity logs"
  ON shortlist_activity FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM shortlists
      WHERE shortlists.id = shortlist_id
      AND auth.uid() = shortlists.hire_profile_id
    )
  );

CREATE POLICY "Users can insert activity on their shortlists"
  ON shortlist_activity FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM shortlists
      WHERE shortlists.id = shortlist_id
      AND auth.uid() = shortlists.hire_profile_id
    )
  );

-- Admin access logic
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND email LIKE '%@yourdomain.com' -- Change this to match your admin logic
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin override policies
CREATE POLICY "Admins can access all talent profiles"
  ON talent_profiles
  USING (is_admin());

CREATE POLICY "Admins can access all hire profiles"
  ON hire_profiles
  USING (is_admin());

CREATE POLICY "Admins can access all shortlists"
  ON shortlists
  USING (is_admin());

CREATE POLICY "Admins can access all shortlist activity"
  ON shortlist_activity
  USING (is_admin());
