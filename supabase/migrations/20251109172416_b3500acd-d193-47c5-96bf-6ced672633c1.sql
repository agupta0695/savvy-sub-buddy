-- ============================================
-- SubSentry - Supabase Backend Setup
-- Complete Database Schema with RLS & Functions
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE 1: USERS (Extended from Supabase Auth)
-- ============================================

CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  phone TEXT,
  premium BOOLEAN DEFAULT FALSE,
  premium_until TIMESTAMP,
  sms_permission BOOLEAN DEFAULT FALSE,
  language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLE 2: SUBSCRIPTIONS
-- ============================================

CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL CHECK (amount >= 0),
  cycle TEXT NOT NULL CHECK (cycle IN ('Monthly', 'Quarterly', 'Annual')),
  next_renewal DATE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Entertainment', 'Fitness', 'Software', 'Shopping', 'Food', 'Other')),
  payment_method TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_next_renewal ON public.subscriptions(next_renewal);
CREATE INDEX idx_subscriptions_active ON public.subscriptions(is_active);

-- ============================================
-- TABLE 3: ALERTS (Renewal Notifications)
-- ============================================

CREATE TABLE public.alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subscription_id UUID NOT NULL REFERENCES public.subscriptions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  alert_date DATE NOT NULL,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('7-day', '2-day-trial', 'custom')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'dismissed', 'actioned', 'failed')),
  action_taken TEXT,
  sent_at TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_alerts_user_id ON public.alerts(user_id);
CREATE INDEX idx_alerts_status ON public.alerts(status);
CREATE INDEX idx_alerts_alert_date ON public.alerts(alert_date);

-- ============================================
-- TABLE 4: CANCELLATION_GUIDES
-- ============================================

CREATE TABLE public.cancellation_guides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform_name TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  steps JSONB NOT NULL,
  direct_link TEXT,
  estimated_time_minutes INT DEFAULT 5,
  community_tips JSONB,
  last_verified DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLE 5: USER_SETTINGS
-- ============================================

CREATE TABLE public.user_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  push_notifications BOOLEAN DEFAULT TRUE,
  sms_alerts BOOLEAN DEFAULT FALSE,
  whatsapp_alerts BOOLEAN DEFAULT FALSE,
  email_alerts BOOLEAN DEFAULT TRUE,
  alert_time TIME DEFAULT '09:00:00',
  currency TEXT DEFAULT 'INR',
  timezone TEXT DEFAULT 'Asia/Kolkata',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLE 6: SPENDING_ANALYTICS (Cached Data)
-- ============================================

CREATE TABLE public.spending_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  month DATE NOT NULL,
  total_monthly DECIMAL(10,2) DEFAULT 0,
  total_annual DECIMAL(10,2) DEFAULT 0,
  subscription_count INT DEFAULT 0,
  money_saved DECIMAL(10,2) DEFAULT 0,
  category_breakdown JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, month)
);

CREATE INDEX idx_analytics_user_month ON public.spending_analytics(user_id, month);

-- ============================================
-- TABLE 7: PAYMENT_TRANSACTIONS (Premium Subscriptions)
-- ============================================

CREATE TABLE public.payment_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  razorpay_order_id TEXT UNIQUE,
  razorpay_payment_id TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  plan_type TEXT NOT NULL CHECK (plan_type IN ('monthly', 'annual')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed', 'refunded')),
  payment_method TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- ============================================
-- TABLE 8: SMS_IMPORTS (Premium Feature)
-- ============================================

CREATE TABLE public.sms_imports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  raw_sms_text TEXT NOT NULL,
  parsed_data JSONB,
  subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processed', 'ignored', 'failed')),
  processed_at TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- TABLE 9: FAMILY_MEMBERS (Premium Feature)
-- ============================================

CREATE TABLE public.family_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  primary_user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  member_email TEXT NOT NULL,
  member_name TEXT,
  status TEXT DEFAULT 'invited' CHECK (status IN ('invited', 'accepted', 'declined')),
  invited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accepted_at TIMESTAMP,
  UNIQUE(primary_user_id, member_email)
);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.spending_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sms_imports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own subscriptions" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscriptions" ON public.subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscriptions" ON public.subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own subscriptions" ON public.subscriptions
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own alerts" ON public.alerts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own alerts" ON public.alerts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own settings" ON public.user_settings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own settings" ON public.user_settings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own settings" ON public.user_settings
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own analytics" ON public.spending_analytics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own transactions" ON public.payment_transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own SMS imports" ON public.sms_imports
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage family members" ON public.family_members
  FOR ALL USING (auth.uid() = primary_user_id);

ALTER TABLE public.cancellation_guides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view cancellation guides" ON public.cancellation_guides
  FOR SELECT USING (true);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

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
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION create_renewal_alert()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.alerts (subscription_id, user_id, alert_date, alert_type)
  VALUES (NEW.id, NEW.user_id, NEW.next_renewal - INTERVAL '7 days', '7-day');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER create_alert_on_subscription_insert
  AFTER INSERT ON public.subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION create_renewal_alert();

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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- INITIAL DATA: Sample Cancellation Guides
-- ============================================

INSERT INTO public.cancellation_guides (platform_name, logo_url, steps, direct_link, estimated_time_minutes, community_tips) VALUES
('Netflix', 'https://logo.clearbit.com/netflix.com', 
  '[
    {"step": 1, "instruction": "Log in to Netflix.com from a web browser"},
    {"step": 2, "instruction": "Click on your profile icon (top right) → Account"},
    {"step": 3, "instruction": "Under Membership & Billing, click Cancel Membership"},
    {"step": 4, "instruction": "Confirm cancellation and take a screenshot"}
  ]'::jsonb,
  'https://www.netflix.com/cancelplan',
  5,
  '["Take a screenshot of the confirmation page", "You can restart anytime without penalty", "Cancellation is effective at the end of your billing period"]'::jsonb
),
('Spotify', 'https://logo.clearbit.com/spotify.com',
  '[
    {"step": 1, "instruction": "Log in to Spotify.com from a web browser"},
    {"step": 2, "instruction": "Go to Account → Manage Plan"},
    {"step": 3, "instruction": "Click Change or Cancel → Cancel Premium"},
    {"step": 4, "instruction": "Confirm cancellation"}
  ]'::jsonb,
  'https://www.spotify.com/account/subscription/',
  4,
  '["Premium features work until billing date", "You can always rejoin later", "Student discount available if eligible"]'::jsonb
),
('Amazon Prime', 'https://logo.clearbit.com/amazon.in',
  '[
    {"step": 1, "instruction": "Log in to Amazon.in → Accounts & Lists"},
    {"step": 2, "instruction": "Click Prime Membership"},
    {"step": 3, "instruction": "Click Update, Cancel and More"},
    {"step": 4, "instruction": "Select End Membership → Confirm"}
  ]'::jsonb,
  'https://www.amazon.in/prime',
  3,
  '["You may be eligible for a refund if unused", "Benefits end immediately after cancellation", "Keep your existing purchases"]'::jsonb
);