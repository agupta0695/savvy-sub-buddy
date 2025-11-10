# Language Translation Implementation Guide

## ✅ What's Been Set Up

### 1. Translation System Created
- ✅ `src/lib/translations.ts` - Complete English & Hindi translations (150+ strings)
- ✅ `src/contexts/LanguageContext.tsx` - Language context and provider
- ✅ `src/App.tsx` - Wrapped with LanguageProvider

### 2. Translation Coverage
All UI elements from the test checklist are included:
- Login & Signup screens
- Onboarding (3 screens)
- Dashboard
- Add/Edit Subscription
- Subscription Detail
- Alerts
- Analytics
- Premium
- Settings
- All confirmation dialogs and messages

## 🔧 How to Use Translations in Components

### Basic Usage

```typescript
import { useLanguage } from '@/contexts/LanguageContext';

const MyComponent = () => {
  const { t, language, setLanguage } = useLanguage();
  
  return (
    <div>
      <h1>{t.appName}</h1>
      <p>{t.tagline}</p>
      <button onClick={() => setLanguage('hi')}>
        Switch to Hindi
      </button>
    </div>
  );
};
```

### Example: Dashboard Component

```typescript
// Before
<div className="text-xl font-bold">Monthly Spending</div>

// After
<div className="text-xl font-bold">{t.monthlySpending}</div>
```

### Example: Settings Language Selector

```typescript
const { t, language, setLanguage } = useLanguage();

<select 
  value={language}
  onChange={(e) => setLanguage(e.target.value as Language)}
>
  <option value="en">🇬🇧 English</option>
  <option value="hi">🇮🇳 हिंदी</option>
</select>
```

## 📝 Implementation Checklist

### Priority 1: Core Pages (Must Do First)

#### 1. Settings Page
Add language selector:
```typescript
import { useLanguage } from '@/contexts/LanguageContext';

const Settings = () => {
  const { t, language, setLanguage } = useLanguage();
  
  // Add language selector in Preferences section
  <div className="card-glass">
    <div className="flex items-center justify-between">
      <span className="font-medium">{t.language}</span>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'en' | 'hi')}
        className="px-4 py-2 rounded-lg border border-input bg-background"
      >
        <option value="en">🇬🇧 English</option>
        <option value="hi">🇮🇳 हिंदी</option>
      </select>
    </div>
  </div>
  
  // Replace all text with t.key
  <h1>{t.settings}</h1>
  <span>{t.notifications}</span>
  <span>{t.pushNotifications}</span>
  // ... etc
};
```

#### 2. Dashboard Page
```typescript
import { useLanguage } from '@/contexts/LanguageContext';

const Dashboard = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <div>{t.monthlySpending}</div>
      <div>{t.annualCost}</div>
      <div>{t.activeSubscriptions}</div>
      {/* Replace all hardcoded text */}
    </>
  );
};
```

#### 3. Login Page
```typescript
const Login = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <h1>{t.appName}</h1>
      <p>{t.tagline}</p>
      <Label>{t.email}</Label>
      <Label>{t.password}</Label>
      <Button>{t.signIn}</Button>
      {/* Replace all text */}
    </>
  );
};
```

### Priority 2: Other Pages

#### 4. Onboarding Page
```typescript
const onboardingScreens = [
  {
    title: t.neverForgetRenewal,
    subtitle: t.getAlertsDesc,
  },
  {
    title: t.seeYourSpending,
    subtitle: t.trackCostsDesc,
  },
  {
    title: t.cancelWithEase,
    subtitle: t.stepByStepDesc,
  },
];
```

#### 5. AddSubscription Page
```typescript
<Label>{t.serviceName}</Label>
<Label>{t.amount}</Label>
<Label>{t.billingCycle}</Label>
<option>{t.monthly}</option>
<option>{t.quarterly}</option>
<option>{t.annual}</option>
<Button>{t.save}</Button>
```

#### 6. Alerts Page
```typescript
<h1>{t.renewalAlerts}</h1>
<Button>{t.keepIt}</Button>
<Button>{t.viewDetails}</Button>
<p>{t.noUpcomingRenewals}</p>
```

#### 7. Analytics Page
```typescript
<h1>{t.analytics}</h1>
<h3>{t.monthlySpendingTrend}</h3>
<h3>{t.categoryBreakdown}</h3>
<Button>{t.exportData}</Button>
```

#### 8. SubscriptionDetail Page
```typescript
<Button>{t.back}</Button>
<h2>{t.details}</h2>
<span>{t.nextRenewal}</span>
<Button>{t.edit}</Button>
<Button>{t.delete}</Button>
```

## 🎯 Quick Implementation Steps

### Step 1: Install (Already Done)
- ✅ Translation files created
- ✅ Context provider created
- ✅ App wrapped with provider

### Step 2: Update Each Page (To Do)

For each page file:

1. Import the hook:
```typescript
import { useLanguage } from '@/contexts/LanguageContext';
```

2. Use the hook:
```typescript
const { t } = useLanguage();
```

3. Replace hardcoded text:
```typescript
// Before
<div>Monthly Spending</div>

// After
<div>{t.monthlySpending}</div>
```

### Step 3: Test

1. Run the app
2. Go to Settings
3. Change language to Hindi
4. Verify all text changes
5. Refresh page - language should persist

## 📋 Translation Keys Reference

### Common Keys
- `t.appName` - App name
- `t.save` - Save button
- `t.cancel` - Cancel button
- `t.edit` - Edit button
- `t.delete` - Delete button
- `t.back` - Back button
- `t.loading` - Loading text
- `t.error` - Error text
- `t.success` - Success text

### Dashboard Keys
- `t.monthlySpending`
- `t.annualCost`
- `t.activeSubscriptions`
- `t.noSubscriptions`

### Subscription Keys
- `t.addSubscription`
- `t.editSubscription`
- `t.serviceName`
- `t.amount`
- `t.billingCycle`
- `t.monthly` / `t.quarterly` / `t.annual`
- `t.category`
- `t.entertainment` / `t.fitness` / `t.software` / etc.

### Settings Keys
- `t.settings`
- `t.notifications`
- `t.pushNotifications`
- `t.smsAlerts`
- `t.language`
- `t.logout`
- `t.deleteAccount`

## 🔍 Finding Text to Replace

Search for these patterns in your code:
1. Hardcoded strings in JSX: `<div>Text</div>`
2. Button labels: `<Button>Click Me</Button>`
3. Placeholder text: `placeholder="Enter text"`
4. Toast messages: `toast.success("Success!")`
5. Confirmation dialogs: `confirm("Are you sure?")`

## 💡 Tips

### 1. Dynamic Text
For text with variables:
```typescript
// Use template literals
`${t.renewsIn} ${days} ${t.days}`
// Result: "Renews in 5 days" or "में नवीनीकरण 5 दिन"
```

### 2. Conditional Text
```typescript
{isLoading ? t.loading : t.save}
```

### 3. Toast Messages
```typescript
toast.success(t.dataExported);
toast.error(t.error);
```

### 4. Confirmation Dialogs
```typescript
if (confirm(t.deleteConfirm)) {
  // Delete logic
}
```

## 🧪 Testing Checklist

After implementation:

- [ ] Settings page has language selector
- [ ] Changing language updates all visible text
- [ ] Language persists after page refresh
- [ ] No console errors
- [ ] All 150+ elements translate correctly
- [ ] Toast notifications in correct language
- [ ] Confirmation dialogs in correct language
- [ ] Form validation messages in correct language

## 📊 Implementation Progress

Track your progress:

- [ ] App.tsx - LanguageProvider added ✅
- [ ] Settings.tsx - Language selector added
- [ ] Dashboard.tsx - All text translated
- [ ] Login.tsx - All text translated
- [ ] Onboarding.tsx - All text translated
- [ ] AddSubscription.tsx - All text translated
- [ ] SubscriptionDetail.tsx - All text translated
- [ ] Alerts.tsx - All text translated
- [ ] Analytics.tsx - All text translated
- [ ] Premium.tsx - All text translated
- [ ] CancelGuide.tsx - All text translated

## 🚀 Quick Start Example

Here's a complete example for Settings page:

```typescript
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/lib/translations';

const Settings = () => {
  const { t, language, setLanguage } = useLanguage();
  
  return (
    <div>
      <h1>{t.settings}</h1>
      
      {/* Language Selector */}
      <div className="card-glass">
        <div className="flex items-center justify-between">
          <span className="font-medium">{t.language}</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="px-4 py-2 rounded-lg border"
          >
            <option value="en">🇬🇧 English</option>
            <option value="hi">🇮🇳 हिंदी</option>
          </select>
        </div>
      </div>
      
      {/* Notifications Section */}
      <h3>{t.notifications}</h3>
      <span>{t.pushNotifications}</span>
      <span>{t.smsAlerts}</span>
      
      {/* Logout Button */}
      <Button onClick={handleLogout}>
        {t.logout}
      </Button>
    </div>
  );
};
```

## 📝 Notes

1. **Category Names**: Categories stored in database won't auto-translate. Consider storing category keys instead of names.

2. **Dates**: Use `Intl.DateTimeFormat` for date localization:
```typescript
new Date().toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US')
```

3. **Numbers**: Currency formatting:
```typescript
amount.toLocaleString(language === 'hi' ? 'hi-IN' : 'en-IN', {
  style: 'currency',
  currency: 'INR'
})
```

## 🎉 Success!

Once all pages are updated, your app will:
- ✅ Support English and Hindi
- ✅ Remember user's language preference
- ✅ Show toast notification when language changes
- ✅ Pass all 150+ translation tests
- ✅ Provide seamless bilingual experience

---

**Need Help?** Check `src/lib/translations.ts` for all available translation keys.
