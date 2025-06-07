-- Add email and confirmed fields to both tables
ALTER TABLE talent_profiles
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS confirmed BOOLEAN DEFAULT FALSE;

ALTER TABLE hire_profiles
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS confirmed BOOLEAN DEFAULT FALSE;

-- Drop existing trigger if it exists to prevent duplication
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create the handle_new_user function to insert based on user role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  user_full_name TEXT;
  user_role TEXT;
BEGIN
  -- Get full name from metadata
  user_full_name := COALESCE(
    new.raw_user_meta_data->>'full_name',
    new.user_meta_data->>'full_name'
  );

  IF user_full_name IS NULL THEN
    RAISE EXCEPTION 'full_name is required in user metadata';
  END IF;

  -- Default role is 'talent'
  user_role := COALESCE(
    new.raw_user_meta_data->>'role',
    new.user_meta_data->>'role',
    'talent'
  );

  -- Insert into appropriate table
  IF user_role = 'hire' THEN
    INSERT INTO public.hire_profiles (user_id, full_name, role, email)
    VALUES (new.id, user_full_name, user_role, new.email);
  ELSE
    INSERT INTO public.talent_profiles (user_id, full_name, role, email)
    VALUES (new.id, user_full_name, user_role, new.email);
  END IF;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger that runs handle_new_user after user signup
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- Backfill confirmed status on both tables
UPDATE talent_profiles p
SET confirmed = TRUE
FROM auth.users u
WHERE p.user_id = u.id
  AND u.email_confirmed_at IS NOT NULL;

UPDATE hire_profiles p
SET confirmed = TRUE
FROM auth.users u
WHERE p.user_id = u.id
  AND u.email_confirmed_at IS NOT NULL;
