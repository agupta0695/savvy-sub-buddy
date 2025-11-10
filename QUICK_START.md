# Quick Start Guide

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- A **Supabase account** - [Sign up here](https://supabase.com/)

## Installation Steps

### 1. Navigate to the Project Directory
```bash
cd savvy-sub-buddy
```

### 2. Install Dependencies
```bash
npm install
```
or if you prefer yarn:
```bash
yarn install
```

### 3. Verify Environment Variables

Check that your `.env` file contains:
```env
VITE_SUPABASE_PROJECT_ID="cwuwjykejpiygzawwium"
VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
VITE_SUPABASE_URL="https://cwuwjykejpiygzawwium.supabase.co"
```

### 4. Verify Database Schema

Ensure your Supabase database has all required tables:
- users
- subscriptions
- alerts
- user_settings
- spending_analytics
- cancellation_guides
- payment_transactions
- family_members
- sms_imports

The schema is already defined in the migrations folder.

### 5. Start Development Server
```bash
npm run dev
```

The application will start at `http://localhost:5173` (or another port if 5173 is busy).

## First Time Setup

### Create a Test User

1. Navigate to `http://localhost:5173/login`
2. Sign up with a test email and password
3. Verify your email (if required by Supabase settings)
4. Login to the application

### Add Your First Subscription

1. Click the **+** button on the dashboard
2. Fill in the subscription details:
   - Name (e.g., "Netflix")
   - Amount (e.g., 649)
   - Billing Cycle (Monthly/Quarterly/Annual)
   - Next Renewal Date
   - Category
3. Click "Add Subscription"
4. You'll be redirected to the dashboard with your new subscription

## Testing the Integration

### Test Dashboard
- ✅ View all subscriptions
- ✅ See monthly and annual spending
- ✅ Check expiring subscriptions alert

### Test Add Subscription
- ✅ Add a new subscription
- ✅ Verify it appears on dashboard
- ✅ Check validation works

### Test Subscription Detail
- ✅ Click on a subscription
- ✅ View all details
- ✅ Delete subscription (with confirmation)

### Test Analytics
- ✅ View spending trends
- ✅ See category breakdown
- ✅ Check money saved
- ✅ View top spending

### Test Alerts
- ✅ View upcoming renewals
- ✅ Filter by urgency
- ✅ Dismiss alerts with "Keep It"
- ✅ Navigate to cancel guide

### Test Settings
- ✅ View profile information
- ✅ Toggle notification preferences
- ✅ Verify settings persist
- ✅ Logout

## Project Structure

```
savvy-sub-buddy/
├── src/
│   ├── components/        # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   │   ├── useAnalytics.tsx      # NEW: Analytics data hooks
│   │   ├── useAlerts.tsx         # NEW: Alerts data hooks
│   │   ├── useUserSettings.tsx   # NEW: Settings data hooks
│   │   └── useSubscriptions.tsx  # Existing: Subscription hooks
│   ├── integrations/
│   │   └── supabase/     # Supabase client and types
│   ├── pages/            # Page components (all updated)
│   │   ├── Dashboard.tsx
│   │   ├── Analytics.tsx         # UPDATED
│   │   ├── Alerts.tsx            # UPDATED
│   │   ├── AddSubscription.tsx   # UPDATED
│   │   ├── SubscriptionDetail.tsx # UPDATED
│   │   └── Settings.tsx          # UPDATED
│   └── lib/              # Utility functions
├── supabase/
│   └── migrations/       # Database migrations
├── .env                  # Environment variables
└── package.json          # Dependencies
```

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Common Issues & Solutions

### Issue: "Cannot find module '@tanstack/react-query'"
**Solution:** Run `npm install` to install all dependencies

### Issue: "Not authenticated" errors
**Solution:** 
1. Check if you're logged in
2. Verify Supabase credentials in `.env`
3. Check browser console for auth errors

### Issue: Empty data on pages
**Solution:**
1. Add some subscriptions first
2. Check Supabase RLS policies
3. Verify user is authenticated

### Issue: TypeScript errors
**Solution:**
1. Run `npm install` to ensure types are installed
2. Restart your IDE/editor
3. Check `tsconfig.json` is properly configured

## Database Functions

The application uses two custom Supabase functions:

### calculate_monthly_spending
Calculates total monthly spending for a user.

### get_expiring_subscriptions
Returns subscriptions expiring within specified days.

These should be created in your Supabase project. Check the migrations folder for SQL definitions.

## Environment Setup

### Development
```bash
npm run dev
```
Uses `.env` file with development Supabase credentials.

### Production
```bash
npm run build
npm run preview
```
Build the app and preview the production build locally.

## Deployment

### Deploy to Vercel
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Deploy to Netlify
1. Push code to GitHub
2. Import project in Netlify
3. Add environment variables
4. Set build command: `npm run build`
5. Set publish directory: `dist`
6. Deploy

## Support & Documentation

- **Full Integration Guide:** See `DATABASE_INTEGRATION.md`
- **Summary:** See `INTEGRATION_SUMMARY.md`
- **Supabase Docs:** https://supabase.com/docs
- **React Query Docs:** https://tanstack.com/query/latest

## What's New

All pages now use real database data instead of mock data:

✅ **Dashboard** - Real subscriptions and spending
✅ **Analytics** - Real spending trends and breakdowns
✅ **Alerts** - Real renewal alerts from database
✅ **Add Subscription** - Saves to database
✅ **Subscription Detail** - Fetches and updates real data
✅ **Settings** - Persists user preferences

## Next Steps

1. **Customize the app** - Modify colors, branding, etc.
2. **Add more features** - Implement family sharing, SMS import, etc.
3. **Deploy to production** - Use Vercel, Netlify, or your preferred platform
4. **Set up monitoring** - Add error tracking and analytics
5. **Configure email** - Set up Supabase email templates

## Need Help?

If you encounter any issues:
1. Check the troubleshooting section in `DATABASE_INTEGRATION.md`
2. Review Supabase logs in the dashboard
3. Check browser console for errors
4. Verify all environment variables are set correctly

Happy coding! 🚀
