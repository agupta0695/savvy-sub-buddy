-- Fix security warnings: Set search_path for all functions

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = public;

CREATE OR REPLACE FUNCTION calculate_monthly_spending(p_user_id UUID)
RETURNS DECIMAL AS $$
DECLARE
  total DECIMAL := 0;
BEGIN
  SELECT COALESCE(SUM(
    CASE 
      WHEN cycle = 'Monthly' THEN amount
      WHEN cycle = 'Quarterly' THEN amount / 3
      WHEN cycle = 'Annual' THEN amount / 12
    END
  ), 0) INTO total
  FROM public.subscriptions
  WHERE user_id = p_user_id AND is_active = TRUE;
  
  RETURN total;
END;
$$ LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public;

CREATE OR REPLACE FUNCTION create_renewal_alert()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.alerts (subscription_id, user_id, alert_date, alert_type)
  VALUES (NEW.id, NEW.user_id, NEW.next_renewal - INTERVAL '7 days', '7-day');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public;

CREATE OR REPLACE FUNCTION get_expiring_subscriptions(days_ahead INT DEFAULT 7)
RETURNS TABLE (
  subscription_id UUID,
  user_id UUID,
  name TEXT,
  amount DECIMAL,
  next_renewal DATE,
  days_left INT
) AS $$
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
  WHERE s.is_active = TRUE
    AND s.next_renewal <= CURRENT_DATE + days_ahead
    AND s.next_renewal >= CURRENT_DATE
  ORDER BY s.next_renewal ASC;
END;
$$ LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public;