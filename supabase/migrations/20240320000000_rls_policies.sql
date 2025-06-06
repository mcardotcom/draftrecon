-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE shortlists ENABLE ROW LEVEL SECURITY;

-- Profiles table policies
CREATE POLICY "Public profiles are viewable by everyone"
ON profiles FOR SELECT
USING (true);

CREATE POLICY "Users can insert their own profile"
ON profiles FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Users can delete their own profile"
ON profiles FOR DELETE
USING (auth.uid() = id);

-- Companies table policies
CREATE POLICY "Companies are viewable by everyone"
ON companies FOR SELECT
USING (true);

CREATE POLICY "Users can insert their own company"
ON companies FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own company"
ON companies FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Users can delete their own company"
ON companies FOR DELETE
USING (auth.uid() = id);

-- Shortlists table policies
CREATE POLICY "Users can view their own shortlists"
ON shortlists FOR SELECT
USING (auth.uid() = recruiter_id);

CREATE POLICY "Users can insert their own shortlists"
ON shortlists FOR INSERT
WITH CHECK (auth.uid() = recruiter_id);

CREATE POLICY "Users can delete their own shortlists"
ON shortlists FOR DELETE
USING (auth.uid() = recruiter_id);

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin policies
CREATE POLICY "Admins can do everything on profiles"
ON profiles
USING (is_admin());

CREATE POLICY "Admins can do everything on companies"
ON companies
USING (is_admin());

CREATE POLICY "Admins can do everything on shortlists"
ON shortlists
USING (is_admin()); 