-- ============================================
-- Fix Missing RLS Policies for Alerts Table
-- ============================================

-- Add INSERT policy for alerts table
-- Users can only insert alerts for their own subscriptions
CREATE POLICY "Users can insert own alerts" ON public.alerts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Add DELETE policy for alerts table
-- Users can only delete their own alerts
CREATE POLICY "Users can delete own alerts" ON public.alerts
  FOR DELETE USING (auth.uid() = user_id);
