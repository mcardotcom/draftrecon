-- Add email and confirmed fields to both tables
ALTER TABLE talent_profiles
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS confirmed BOOLEAN DEFAULT FALSE;

ALTER TABLE hire_profiles
ADD COLUMN IF NOT EXISTS email TEXT,
ADD COLUMN IF NOT EXISTS confirmed BOOLEAN DEFAULT FALSE;

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create the handle_new_user function to insert based on user role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  user_name TEXT;
  user_username TEXT;
  user_role TEXT;
BEGIN
  -- Debug: Log the entire new record
  RAISE LOG 'New user record: %', new;
  RAISE LOG 'Raw metadata: %', new.raw_user_meta_data;

  -- Get metadata values with explicit type casting
  user_name := (new.raw_user_meta_data->>'name')::TEXT;
  user_username := (new.raw_user_meta_data->>'username')::TEXT;
  user_role := (new.raw_user_meta_data->>'role')::TEXT;

  -- Debug: Log all relevant values
  RAISE LOG 'Trigger called for new user:';
  RAISE LOG 'user_id: %', new.id;
  RAISE LOG 'email: %', new.email;
  RAISE LOG 'user_name: %', user_name;
  RAISE LOG 'user_username: %', user_username;
  RAISE LOG 'user_role: %', user_role;

  -- Validate required fields
  IF user_name IS NULL THEN
    RAISE EXCEPTION 'name is required in user metadata';
  END IF;

  IF user_username IS NULL THEN
    RAISE EXCEPTION 'username is required in user metadata';
  END IF;

  -- Default to creating a talent profile unless explicitly marked as hire
  IF user_role = 'hire' THEN
    RAISE LOG 'Creating hire profile for user %', new.id;
    INSERT INTO public.hire_profiles (user_id, name, email)
    VALUES (new.id, user_name, new.email);
  ELSE
    BEGIN
      RAISE LOG 'Creating talent profile for user %', new.id;
      INSERT INTO public.talent_profiles (user_id, name, username, email)
      VALUES (new.id, user_name, user_username, new.email);
    EXCEPTION WHEN OTHERS THEN
      RAISE LOG 'Error inserting into talent_profiles: %', SQLERRM;
      RAISE;
    END;
  END IF;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger that runs handle_new_user after user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

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
