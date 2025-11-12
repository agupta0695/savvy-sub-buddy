-- Fix critical security vulnerabilities in database functions

-- 1. Fix get_expiring_subscriptions to filter by calling user only
CREATE OR REPLACE FUNCTION public.get_expiring_subscriptions(days_ahead integer DEFAULT 7)
RETURNS TABLE(subscription_id uuid, user_id uuid, name text, amount numeric, next_renewal date, days_left integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.id,
    s.user_id,
    s.name,
    s.amount,
    s.next_renewal,
    (s.next_renewal - CURRENT_DATE) AS days_left
  FROM public.subscriptions s
  WHERE s.user_id = auth.uid()  -- SECURITY FIX: Filter by calling user
    AND s.is_active = TRUE
    AND s.next_renewal <= CURRENT_DATE + days_ahead
    AND s.next_renewal >= CURRENT_DATE
  ORDER BY s.next_renewal ASC;
END;
$$;

-- 2. Fix calculate_monthly_spending to use auth.uid() directly
CREATE OR REPLACE FUNCTION public.calculate_monthly_spending()
RETURNS numeric
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  total DECIMAL := 0;
BEGIN
  -- SECURITY FIX: Use auth.uid() directly instead of accepting parameter
  SELECT COALESCE(SUM(
    CASE 
      WHEN cycle = 'Monthly' THEN amount
      WHEN cycle = 'Quarterly' THEN amount / 3
      WHEN cycle = 'Annual' THEN amount / 12
    END
  ), 0) INTO total
  FROM public.subscriptions
  WHERE user_id = auth.uid() AND is_active = TRUE;
  
  RETURN total;
END;
$$;