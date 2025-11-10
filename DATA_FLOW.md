# Data Flow Architecture

## Overview
This document describes how data flows through the Savvy Sub Buddy application from the UI to the database and back.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
│  (React Components - Pages)                                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      CUSTOM HOOKS LAYER                         │
│  (React Query + Custom Logic)                                   │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │useSubscriptions│  │useAnalytics │  │  useAlerts   │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│  ┌──────────────┐                                              │
│  │useUserSettings│                                             │
│  └──────────────┘                                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    REACT QUERY CACHE                            │
│  (Client-side caching & state management)                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    SUPABASE CLIENT                              │
│  (API calls & authentication)                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    SUPABASE DATABASE                            │
│  (PostgreSQL with RLS)                                          │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │subscriptions │  │    alerts    │  │user_settings │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│  ┌──────────────┐  ┌──────────────┐                           │
│  │    users     │  │  spending_   │                           │
│  │              │  │  analytics   │                           │
│  └──────────────┘  └──────────────┘                           │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow by Feature

### 1. Dashboard - View Subscriptions

```
User opens Dashboard
        ↓
Dashboard.tsx calls useSubscriptions()
        ↓
useSubscriptions hook queries React Query cache
        ↓
If cache miss → Supabase query
        ↓
supabase.from("subscriptions").select("*").eq("is_active", true)
        ↓
Database returns subscription data
        ↓
React Query caches the data
        ↓
Dashboard renders subscription list
```

### 2. Add Subscription

```
User fills form in AddSubscription.tsx
        ↓
User clicks "Add Subscription"
        ↓
addSubscription.mutate() called
        ↓
Supabase insert query
        ↓
supabase.from("subscriptions").insert({ ... })
        ↓
Database saves subscription
        ↓
onSuccess: invalidate ["subscriptions"] query
        ↓
React Query refetches subscriptions
        ↓
Dashboard updates automatically
        ↓
Navigate to Dashboard
```

### 3. View Analytics

```
User opens Analytics page
        ↓
Analytics.tsx calls multiple hooks:
  - useSpendingAnalytics()
  - useCategoryBreakdown()
  - useSubscriptions()
  - useMonthlySpending()
        ↓
Each hook queries React Query cache
        ↓
If cache miss → Supabase queries
        ↓
Database returns data
        ↓
React Query caches all data
        ↓
Analytics page renders charts and stats
```

### 4. View Alerts

```
User opens Alerts page
        ↓
Alerts.tsx calls useAlerts(filter)
        ↓
useAlerts queries with filter parameter
        ↓
Supabase query with joins:
  alerts + subscriptions
        ↓
Database returns alerts with subscription details
        ↓
React Query caches alerts
        ↓
Alerts page renders alert cards
```

### 5. Dismiss Alert

```
User clicks "Keep It" on alert
        ↓
handleKeepIt(alertId) called
        ↓
updateAlert.mutate({ alertId, action: "kept" })
        ↓
Supabase update query
        ↓
supabase.from("alerts").update({ status: "resolved" })
        ↓
Database updates alert
        ↓
onSuccess: invalidate ["alerts"] query
        ↓
React Query refetches alerts
        ↓
Alert removed from list
```

### 6. View Subscription Detail

```
User clicks subscription on Dashboard
        ↓
Navigate to /subscription/:id
        ↓
SubscriptionDetail.tsx calls useQuery with id
        ↓
Supabase query by ID
        ↓
supabase.from("subscriptions").select("*").eq("id", id).single()
        ↓
Database returns subscription
        ↓
React Query caches subscription
        ↓
Detail page renders subscription info
```

### 7. Delete Subscription

```
User clicks "Delete Subscription"
        ↓
Confirmation dialog appears
        ↓
User confirms deletion
        ↓
deleteSubscription.mutate()
        ↓
Supabase delete query
        ↓
supabase.from("subscriptions").delete().eq("id", id)
        ↓
Database deletes subscription
        ↓
onSuccess: invalidate ["subscriptions"] query
        ↓
React Query refetches subscriptions
        ↓
Navigate to Dashboard
```

### 8. Update Settings

```
User toggles setting in Settings page
        ↓
handleSettingChange(key, value) called
        ↓
updateSettings.mutate({ [key]: value })
        ↓
Supabase upsert query
        ↓
supabase.from("user_settings").upsert({ ... })
        ↓
Database updates/inserts setting
        ↓
onSuccess: invalidate ["user-settings"] query
        ↓
React Query refetches settings
        ↓
Toggle reflects new state
```

## Query Invalidation Strategy

### When to Invalidate

```
Add Subscription → Invalidate:
  - ["subscriptions"]
  - ["monthly-spending"]

Delete Subscription → Invalidate:
  - ["subscriptions"]
  - ["monthly-spending"]

Update Alert → Invalidate:
  - ["alerts"]

Update Settings → Invalidate:
  - ["user-settings"]
```

## Caching Strategy

### Cache Times
- **Subscriptions:** Cached until invalidated
- **Analytics:** Cached until invalidated
- **Alerts:** Cached until invalidated
- **Settings:** Cached until invalidated
- **User Profile:** Cached until invalidated

### Stale Times
React Query default: Data is considered fresh for 0ms (always stale)
- Queries refetch on window focus
- Queries refetch on reconnect
- Queries refetch on mount (if stale)

## Authentication Flow

```
User visits protected route
        ↓
ProtectedRoute component checks auth
        ↓
supabase.auth.getUser()
        ↓
If authenticated → Render page
If not → Redirect to /login
        ↓
All queries include user_id filter
        ↓
Database RLS policies enforce access
```

## Error Handling Flow

```
Query/Mutation fails
        ↓
Error caught in onError callback
        ↓
Toast notification displayed
        ↓
Error logged to console
        ↓
User sees error message
        ↓
User can retry action
```

## Loading State Flow

```
Query initiated
        ↓
isLoading = true
        ↓
Skeleton components render
        ↓
Data fetched from database
        ↓
isLoading = false
        ↓
Actual content renders
```

## Real-time Updates (Future)

```
Database change occurs
        ↓
Supabase realtime subscription triggers
        ↓
Client receives update
        ↓
React Query cache updated
        ↓
UI automatically re-renders
```

## Performance Optimizations

### 1. Query Deduplication
Multiple components requesting same data → Single API call

### 2. Background Refetching
Stale data shown immediately, fresh data fetched in background

### 3. Optimistic Updates
UI updates before server confirmation for better UX

### 4. Selective Invalidation
Only invalidate affected queries, not entire cache

### 5. Parallel Queries
Multiple independent queries run simultaneously

## Data Consistency

### Ensuring Consistency
1. **Query Invalidation** - Refetch after mutations
2. **Optimistic Updates** - Rollback on error
3. **RLS Policies** - Server-side data access control
4. **Type Safety** - TypeScript prevents data mismatches

### Conflict Resolution
- Last write wins (database timestamp)
- User notified of conflicts via toast
- Automatic refetch resolves conflicts

## Security Layers

```
┌─────────────────────────────────────┐
│  1. Client-side Auth Check          │
│     (ProtectedRoute component)      │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  2. Supabase Auth Token             │
│     (JWT in request headers)        │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  3. Row Level Security (RLS)        │
│     (Database policies)             │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  4. Data Access Granted             │
└─────────────────────────────────────┘
```

## Summary

The application uses a clean, layered architecture:
1. **UI Layer** - React components
2. **Hook Layer** - Custom hooks with React Query
3. **Cache Layer** - React Query cache
4. **API Layer** - Supabase client
5. **Database Layer** - PostgreSQL with RLS

This architecture provides:
- ✅ Type safety with TypeScript
- ✅ Automatic caching and refetching
- ✅ Optimistic updates
- ✅ Error handling
- ✅ Loading states
- ✅ Security with RLS
- ✅ Clean separation of concerns
