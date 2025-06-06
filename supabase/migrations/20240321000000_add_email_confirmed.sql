-- Add email and confirmed columns to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS email text,
ADD COLUMN IF NOT EXISTS confirmed boolean DEFAULT false;

-- Update the handle_new_user function to include email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  user_full_name text;
  user_role text;
BEGIN
  -- Get full_name from metadata (check both raw and regular metadata)
  user_full_name := COALESCE(
    new.raw_user_meta_data->>'full_name',
    new.user_meta_data->>'full_name'
  );
  
  -- Require full_name in metadata
  IF user_full_name IS NULL THEN
    RAISE EXCEPTION 'full_name is required in user metadata';
  END IF;
  
  -- Get role from metadata or default to 'talent'
  user_role := COALESCE(
    new.raw_user_meta_data->>'role',
    new.user_meta_data->>'role',
    'talent'
  );
  
  -- Insert the profile with email
  INSERT INTO public.profiles (id, full_name, role, email)
  VALUES (new.id, user_full_name, user_role, new.email);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update existing profiles to set confirmed status based on email_confirmed_at
UPDATE profiles p
SET confirmed = true
FROM auth.users u
WHERE p.id = u.id
AND u.email_confirmed_at IS NOT NULL; 