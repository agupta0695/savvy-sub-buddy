# Google OAuth Setup Guide

## Quick Setup (5 Minutes)

Follow these steps to enable Google OAuth authentication in your Savvy Sub Buddy app.

## Step 1: Google Cloud Console Setup

### 1.1 Create/Select Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **Select a project** → **New Project**
3. Enter project name: "Savvy Sub Buddy"
4. Click **Create**

### 1.2 Enable Google+ API
1. In the left sidebar, go to **APIs & Services** → **Library**
2. Search for "Google+ API"
3. Click on it and click **Enable**

### 1.3 Configure OAuth Consent Screen
1. Go to **APIs & Services** → **OAuth consent screen**
2. Select **External** (for public app) or **Internal** (for organization)
3. Click **Create**
4. Fill in required fields:
   - **App name**: Savvy Sub Buddy
   - **User support email**: your-email@example.com
   - **Developer contact**: your-email@example.com
5. Click **Save and Continue**
6. Skip **Scopes** (click Save and Continue)
7. Add test users if needed (for development)
8. Click **Save and Continue**

### 1.4 Create OAuth 2.0 Credentials
1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth 2.0 Client ID**
3. Select **Application type**: Web application
4. Enter **Name**: Savvy Sub Buddy Web Client
5. Add **Authorized JavaScript origins**:
   ```
   http://localhost:5173
   https://your-domain.com
   ```
6. Add **Authorized redirect URIs**:
   ```
   https://YOUR_SUPABASE_PROJECT_ID.supabase.co/auth/v1/callback
   ```
   Replace `YOUR_SUPABASE_PROJECT_ID` with your actual Supabase project ID
7. Click **Create**
8. **Copy** the Client ID and Client Secret (you'll need these)

## Step 2: Supabase Configuration

### 2.1 Enable Google Provider
1. Go to your [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Go to **Authentication** → **Providers**
4. Find **Google** in the list
5. Toggle **Enable** to ON

### 2.2 Add Google Credentials
1. Paste your **Client ID** from Google Cloud Console
2. Paste your **Client Secret** from Google Cloud Console
3. Click **Save**

### 2.3 Get Redirect URL
1. In the Google provider settings, you'll see the redirect URL:
   ```
   https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
   ```
2. Copy this URL
3. Go back to Google Cloud Console
4. Add this URL to **Authorized redirect URIs** (if not already added)

## Step 3: Update Environment Variables

### 3.1 Check .env File
Ensure your `.env` file has the correct Supabase credentials:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
VITE_SUPABASE_PROJECT_ID=YOUR_PROJECT_ID
```

### 3.2 Restart Development Server
```bash
npm run dev
```

## Step 4: Test the Integration

### 4.1 Test Google Sign-In
1. Open your app: `http://localhost:5173`
2. Click **"Sign in with Google"** button
3. Select your Google account
4. Authorize the app
5. You should be redirected to the onboarding screen (new user) or dashboard (existing user)

### 4.2 Verify User Creation
1. Go to Supabase Dashboard
2. Navigate to **Authentication** → **Users**
3. You should see your Google account listed
4. Go to **Table Editor** → **users**
5. Verify your user record exists

## Troubleshooting

### Error: "Pop-up blocked"
**Solution:** Allow pop-ups in your browser for localhost

### Error: "OAuth not configured"
**Solution:** 
1. Verify Google provider is enabled in Supabase
2. Check Client ID and Client Secret are correct
3. Ensure redirect URL is added in Google Cloud Console

### Error: "Redirect URI mismatch"
**Solution:**
1. Copy the exact redirect URL from Supabase
2. Add it to Google Cloud Console → Credentials → Authorized redirect URIs
3. Make sure there are no trailing slashes or typos

### Error: "Access blocked: This app's request is invalid"
**Solution:**
1. Complete OAuth consent screen configuration
2. Add your email as a test user (for development)
3. Verify app is not in "Testing" mode if you want public access

### Error: User not redirected after sign-in
**Solution:**
1. Check browser console for errors
2. Verify `users` table exists in Supabase
3. Check RLS policies allow user creation

## Production Deployment

### Before Going Live

1. **Update Authorized Origins**
   - Add your production domain to Google Cloud Console
   - Example: `https://savvy-sub-buddy.com`

2. **Update Redirect URIs**
   - Keep the Supabase callback URL
   - Remove localhost URLs (or keep for development)

3. **Publish OAuth Consent Screen**
   - Go to Google Cloud Console → OAuth consent screen
   - Click **Publish App**
   - Submit for verification if needed

4. **Update Environment Variables**
   - Set production Supabase URL
   - Ensure all credentials are correct

5. **Test in Production**
   - Test Google sign-in on production domain
   - Verify user creation
   - Check error handling

## Security Checklist

- [ ] OAuth consent screen configured
- [ ] Only necessary scopes requested
- [ ] Redirect URIs properly configured
- [ ] Client Secret kept secure (not in client code)
- [ ] HTTPS enabled in production
- [ ] RLS policies enabled on users table
- [ ] Email verification enabled (for email signups)

## Common OAuth Scopes

The app requests these scopes by default:
- `email` - User's email address
- `profile` - Basic profile information (name, picture)

To request additional scopes, modify the OAuth configuration in `Login.tsx`:
```typescript
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: "google",
  options: {
    scopes: 'email profile', // Add more scopes here
    redirectTo: `${window.location.origin}/onboarding`,
  },
});
```

## Support Resources

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Google OAuth 2.0 Docs](https://developers.google.com/identity/protocols/oauth2)
- [Supabase Discord](https://discord.supabase.com/)

## Summary

✅ **Google Cloud Console configured**
✅ **Supabase Google provider enabled**
✅ **OAuth credentials added**
✅ **Redirect URLs configured**
✅ **Ready to test**

Your Google OAuth integration is now complete! Users can sign in with their Google accounts and enjoy a seamless onboarding experience.
