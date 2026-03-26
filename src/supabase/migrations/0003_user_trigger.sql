-- Migration 0003: Auto-create person/student/employer records on auth user creation
-- This trigger fires immediately when a Supabase Auth user is inserted,
-- so DB records exist whether or not email confirmation is required.

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
    v_role      TEXT;
    v_full_name TEXT;
    v_person_id UUID;
BEGIN
    v_role      := NEW.raw_user_meta_data->>'role';
    v_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email);

    -- Create the person record
    INSERT INTO public.person (full_name, email_addr, auth_user_id)
    VALUES (v_full_name, NEW.email, NEW.id)
    RETURNING person_id INTO v_person_id;

    -- Create the role-specific record
    IF v_role = 'employer' THEN
        INSERT INTO public.employer (co_name, auth_user_id)
        VALUES (v_full_name, NEW.id);
    ELSE
        -- Default to student if role is missing or 'student'
        INSERT INTO public.student (person_id)
        VALUES (v_person_id);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
