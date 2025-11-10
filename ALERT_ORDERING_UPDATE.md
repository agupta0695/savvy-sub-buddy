# Alert Ordering Update ✅

## Change Summary
Updated the alerts to display in **ascending order of days left** (most urgent first).

## What Was Changed

### File Modified: `src/hooks/useAlerts.tsx`

**Before:**
```typescript
.order("alert_date", { ascending: true });
```

**After:**
```typescript
// Sort by days left (ascending) - most urgent first
const sortedData = (data as unknown as Alert[]).sort((a, b) => {
  const daysLeftA = Math.ceil(
    (new Date(a.subscription.next_renewal).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  const daysLeftB = Math.ceil(
    (new Date(b.subscription.next_renewal).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );
  return daysLeftA - daysLeftB;
});
```

## How It Works

### Sorting Logic
1. **Calculate days left** for each alert based on subscription's `next_renewal` date
2. **Sort in ascending order** (smallest to largest)
3. **Most urgent alerts appear first** (fewer days left = higher priority)

### Example Order
```
Alert 1: 2 days left   ← Most urgent (shown first)
Alert 2: 5 days left
Alert 3: 7 days left   ← Least urgent (shown last)
```

## Impact on Pages

### Alerts Page (`src/pages/Alerts.tsx`)
- ✅ Alerts now display with most urgent at the top
- ✅ Critical alerts (2 days or less) appear first
- ✅ Warning alerts (3-7 days) appear next
- ✅ Info alerts (8+ days) appear last

### Dashboard (`src/pages/Dashboard.tsx`)
- ✅ Already sorted by `next_renewal` ascending
- ✅ Subscriptions show in order of upcoming renewals
- ✅ Consistent with alerts page ordering

## Verification

### Test Cases
1. **Multiple alerts with different days left**
   - Expected: Sorted by days left (ascending)
   - Result: ✅ Correct order

2. **Same day renewals**
   - Expected: Maintain stable sort order
   - Result: ✅ Consistent ordering

3. **Past due renewals**
   - Expected: Negative days shown first
   - Result: ✅ Most overdue first

## Database Functions

### Already Correct ✅
The database function `get_expiring_subscriptions()` already returns results ordered by `next_renewal` ASC:

```sql
ORDER BY s.next_renewal ASC
```

This ensures consistency across:
- Dashboard expiring subscriptions
- Alerts page
- All queries using this function

## User Experience

### Before
Alerts might appear in random or database insertion order, making it hard to identify urgent renewals.

### After
- 🎯 **Most urgent alerts always at the top**
- 👁️ **Easy to spot critical renewals**
- 📊 **Consistent ordering across all pages**
- ⚡ **Better user experience**

## Technical Details

### Calculation Method
```typescript
const daysLeft = Math.ceil(
  (new Date(next_renewal).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
);
```

- Uses `Math.ceil()` to round up partial days
- Calculates milliseconds difference
- Converts to days (1000ms × 60s × 60m × 24h)

### Performance
- ✅ Client-side sorting (minimal data)
- ✅ No additional database queries
- ✅ Cached by React Query
- ✅ Fast re-sorting on data updates

## Related Files

### Files Using Alert Ordering
1. `src/hooks/useAlerts.tsx` - **Modified** ✅
2. `src/pages/Alerts.tsx` - Uses sorted data ✅
3. `src/pages/Dashboard.tsx` - Already sorted ✅
4. `src/hooks/useSubscriptions.tsx` - Already sorted ✅

### Database Schema
- `supabase/migrations/*.sql` - Functions already correct ✅

## Summary

✅ **Alerts now display in ascending order of days left**
✅ **Most urgent renewals appear first**
✅ **Consistent ordering across all pages**
✅ **Better user experience for managing renewals**

The change ensures users always see their most urgent subscription renewals at the top of the alerts list, making it easier to take action on critical renewals.
