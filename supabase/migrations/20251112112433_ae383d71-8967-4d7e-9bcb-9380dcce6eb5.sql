-- Remove unused family_members table with incomplete RLS configuration
DROP TABLE IF EXISTS public.family_members CASCADE;