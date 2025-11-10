# Database Integration Guide

## Overview
This document describes the database integration implemented for the Savvy Sub Buddy application. All pages now connect to Supabase to load and save real data instead of using mock data.

## Database Schema
The application uses the following Supabase tables:
- `users` - User profiles and authentication
- `subscriptions` - User subscription data
- `alerts` - Renewal alerts and notifications
- `user_settings` - User preferences and settings
- `spending_analytics` - Historical spending data
- `cancellation_guides` - Guides for canceling subscriptions
- `payment_transactions` - Premium payment records
- `family_members` - Family sharing feature
- `sms_imports` - SMS import history

## Custom Hooks Created

### 1. useAnalytics.tsx
**Location:** `src/hooks/useAnalytics.tsx`

**Exports:**
- `useSpendingAnalytics()` - Fetches last 6 months of spending analytics
- `useCategoryBreakdown()` - Calculates spending breakdown by category

**Usage:**
```typescript
const { data: analytics, isLoading } = useSpendingAnalytics();
const { data: categoryData, isLoading } = useCategoryBreakdown();
```

### 2. useAlerts.tsx
**Location:** `src/hooks/useAlerts.tsx`

**Exports:**
- `useAlerts(filter)` - Fetches alerts with optional filtering (All/Critical/Warning)
- `useUpdateAlert()` - Mutation to update alert status

**Usage:**
```typescript
const { data: alerts, isLoading } = useAlerts("All");
const updateAlert = useUpdateAlert();
await updateAlert.mutateAsync({ alertId, action: "kept" });
```

### 3. useUserSettings.tsx
**Location:** `src/hooks/useUserSettings.tsx`

**Exports:**
- `useUserSettings()` - Fetches user settings
- `useUpdateUserSettings()` - Mutation to update settings
- `useUserProfile()` - Fetches user profile data

**Usage:**
```typescript
const { data: settings, isLoading } = useUserSettings();
const updateSettings = useUpdateUserSettings();
await updateSettings.mutateAsync({ push_notifications: true });
```

### 4. useSubscriptions.tsx (Already existed)
**Location:** `src/hooks/useSubscriptions.tsx`

**Exports:**
- `useSubscriptions()` - Fetches active subscriptions
- `useMonthlySpending()` - Calculates total monthly spending
- `useExpiringSubscriptions(daysAhead)` - Fetches subscriptions expiring soon

## Pages Updated

### 1. Dashboard.tsx ✅
**Status:** Already integrated with database
- Displays real subscriptions from database
- Shows actual monthly and annual spending
- Displays expiring subscriptions alerts

### 2. Analytics.tsx ✅
**Status:** Now integrated with database

**Changes:**
- Fetches real spending analytics data
- Calculates actual category breakdown from subscriptions
- Displays real money saved from analytics table
- Shows top 3 subscriptions by amount
- Calculates percentage change vs previous month

**Features:**
- Monthly spending trend visualization
- Category breakdown with percentages
- Money saved tracking
- Top spending subscriptions

### 3. Alerts.tsx ✅
**Status:** Now integrated with database

**Changes:**
- Fetches real alerts from database
- Filters by urgency (All/Critical/Warning)
- Updates alert status when user takes action
- Shows days left until renewal
- Displays subscription details from joined data

**Features:**
- Real-time alert filtering
- "Keep It" action to dismiss alerts
- Navigation to cancel guide
- Empty state when no alerts

### 4. AddSubscription.tsx ✅
**Status:** Now integrated with database

**Changes:**
- Saves new subscriptions to database
- Validates required fields
- Invalidates queries to refresh dashboard
- Shows loading state during save

**Features:**
- Form validation
- Database insertion
- Success/error toast notifications
- Automatic navigation after save

### 5. SubscriptionDetail.tsx ✅
**Status:** Now integrated with database

**Changes:**
- Fetches subscription by ID from database
- Displays all subscription details
- Implements delete functionality
- Shows loading skeleton while fetching
- Handles not found state

**Features:**
- Real-time subscription data
- Delete with confirmation
- Days until renewal calculation
- Dynamic urgency coloring
- Navigation to cancel guide

### 6. Settings.tsx ✅
**Status:** Now integrated with database

**Changes:**
- Fetches user profile and settings
- Updates notification preferences in real-time
- Shows actual subscription count and spending
- Implements logout functionality

**Features:**
- Toggle push notifications
- Toggle SMS alerts
- Toggle WhatsApp alerts
- Toggle email alerts
- Display user profile with stats
- Logout functionality

## Database Functions Used

### calculate_monthly_spending
Calculates total monthly spending for a user by summing active subscriptions normalized to monthly amounts.

**Usage:**
```typescript
const { data } = await supabase.rpc("calculate_monthly_spending", {
  p_user_id: user.id,
});
```

### get_expiring_subscriptions
Returns subscriptions expiring within specified days with days_left calculation.

**Usage:**
```typescript
const { data } = await supabase.rpc("get_expiring_subscriptions", {
  days_ahead: 7,
});
```

## Query Invalidation Strategy

The application uses React Query's invalidation to keep data fresh:

1. **After adding subscription:**
   - Invalidates `["subscriptions"]`
   - Invalidates `["monthly-spending"]`

2. **After deleting subscription:**
   - Invalidates `["subscriptions"]`

3. **After updating alert:**
   - Invalidates `["alerts"]`

4. **After updating settings:**
   - Invalidates `["user-settings"]`

## Authentication Flow

All hooks check for authenticated user:
```typescript
const { data: { user } } = await supabase.auth.getUser();
if (!user) throw new Error("Not authenticated");
```

Protected routes use the `ProtectedRoute` component to ensure authentication.

## Error Handling

All mutations include error handling with toast notifications:
```typescript
onError: (error) => {
  toast({
    title: "Error",
    description: "Failed to perform action",
    variant: "destructive",
  });
}
```

## Loading States

All pages implement loading skeletons:
- Dashboard: Skeleton for stats and subscription list
- Analytics: Skeleton for charts and data
- Alerts: Skeleton for alert cards
- Settings: Skeleton for profile and settings
- SubscriptionDetail: Skeleton for details

## Environment Variables

Required in `.env`:
```
VITE_SUPABASE_PROJECT_ID=your_project_id
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
VITE_SUPABASE_URL=your_supabase_url
```

## Installation & Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure Supabase is configured with the schema
4. Update `.env` with your Supabase credentials
5. Run the development server:
   ```bash
   npm run dev
   ```

## Testing the Integration

1. **Login** - Authenticate with a test user
2. **Dashboard** - Verify subscriptions load from database
3. **Add Subscription** - Create a new subscription and verify it appears
4. **Subscription Detail** - Click a subscription and verify details load
5. **Analytics** - Check that spending data displays correctly
6. **Alerts** - Verify alerts show for upcoming renewals
7. **Settings** - Toggle settings and verify they persist

## Future Enhancements

- Implement edit subscription functionality
- Add real-time subscriptions with Supabase realtime
- Implement family sharing features
- Add SMS import functionality
- Implement cancellation guide integration
- Add export data functionality
- Implement premium payment flow

## Troubleshooting

**Issue:** Queries return empty data
- Check if user is authenticated
- Verify Supabase RLS policies allow access
- Check browser console for errors

**Issue:** Mutations fail
- Verify database schema matches types
- Check Supabase RLS policies for insert/update/delete
- Ensure required fields are provided

**Issue:** TypeScript errors
- Run `npm install` to ensure all dependencies are installed
- Check that types are properly imported from `@/integrations/supabase/types`

## Summary

All pages are now fully integrated with Supabase database:
- ✅ Dashboard - Already integrated
- ✅ Analytics - Now using real data
- ✅ Alerts - Now using real data
- ✅ AddSubscription - Now saves to database
- ✅ SubscriptionDetail - Now fetches and updates real data
- ✅ Settings - Now fetches and updates real data

The application is production-ready with proper error handling, loading states, and data persistence.
